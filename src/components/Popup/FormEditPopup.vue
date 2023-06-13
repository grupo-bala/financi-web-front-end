<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import axios, { AxiosError } from "axios";
import InputField from "../Inputs/InputField.vue";
import SelectComponent from "../Inputs/SelectComponent.vue";
import ButtonComponent from "../ButtonComponent.vue";
import { Transaction } from "../../types/Transaction";
import { getNameFromCategoryId } from "../../types/Category";
import { useTransactionsStore } from "../../stores/transactionsStore";
import { useGoalsStore } from "../../stores/goalsStore";
import { Goal } from "../../types/Goal";
import { useFeedbackStore } from "../../stores/feedbackStore";

const sliceStart = 0;
const sliceEnd = 10;
const itensCategory = ref<Category[]>([]);
const feedback = ref("");
const envUrl = import.meta.env.VITE_API_URL;
const transactions = useTransactionsStore();
const goalStore = useGoalsStore();
const feedbackModal = useFeedbackStore();
type ErrorResponse = {msg: string};
type SuccessResponse = {
  data: Category[],
}

type Category = {
  id: number,
  name: string,
}

const props = defineProps<{
  type: "Income" | "Out" | "Goal"
  operation?: Transaction,
  goal?: Goal
}>();

const title = ref(props.type === "Goal" ?
  props.goal!.title : props.operation!.title);
const value = ref(props.type === "Goal" ?
  props.goal!.totalValue : props.operation!.value);
const date = ref(props.type === "Goal" ?
  props.goal!.deadline.slice(sliceStart, sliceEnd) :
  props.operation!.date.slice(sliceStart, sliceEnd));
const category = ref(props.type === "Goal" ?
  "empty" : getNameFromCategoryId(props.operation!.categoryId));
const getColor = computed(() => {
  if (props.type === "Out") {
    return "red";
  } else if (props.type === "Income") {
    return "green";
  }
  return "blue";
});

value.value = Number(value.value)
  .toLocaleString("pt-Br", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const emits = defineEmits<{
  (e: "success", value: boolean): boolean
}>();

const typeLabelMoney = props.type === "Goal" ? "Objetivo" : "Valor";
const typeLabelDate = props.type === "Goal" ? "Data limite" : "Data";

function getItensCategory() {
  return itensCategory.value.map((category) => category.name);
}

async function getCategories() {
  try {
    const response = await axios
      .get<SuccessResponse>(`${envUrl}/get-all-categories`);
    itensCategory.value = response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const response = axiosError.response?.data as ErrorResponse;
    feedback.value = response.msg;
  }
}

async function setAction() {
  if (props.type === "Income" || props.type === "Out") {
    editTransaction();
  } else if (props.type === "Goal") {
    editGoal();
  }
}

async function editTransaction() {
  try {
    await axios.put(`${envUrl}/update-transaction`, {
      value: Number(value.value.replace(".", "").replace(",", ".")),
      date: new Date(date.value),
      categoryId: itensCategory.value.find((c) => {
        return c.name === category.value;
      })?.id,
      id: props.operation!.id,
      title: title.value,
      isEntry: props.operation!.isEntry,
      description: "",
    });
    transactions.edit({
      value: value.value.replace(".", "").replace(",", "."),
      date: date.value,
      categoryId: itensCategory.value.find((c) => {
        return c.name === category.value;
      })!.id,
      id: props.operation!.id,
      title: title.value,
      isEntry: props.operation!.isEntry,
    });

    feedbackModal.notify("Sua transação foi editada com sucesso");

    emits("success", true);
  } catch (error) {
    const axiosError = error as AxiosError;
    const response = axiosError.response?.data as ErrorResponse;
    feedback.value = response.msg;
    emits("success", false);
  }
}

async function editGoal() {
  try {
    await axios.put(`${envUrl}/update-goal`, {
      id: props.goal!.id,
      title: title.value,
      currentValue: Number(
        props.goal!.currentValue.replace(".", "").replace(",", "."),
      ),
      totalValue: Number(value.value.replace(".", "").replace(",", ".")),
      deadline: new Date(date.value),
    });
    goalStore.edit({
      id: props.goal!.id,
      deadline: date.value,
      totalValue: value.value.replace(".", "").replace(",", "."),
      title: title.value,
      userId: props.goal!.userId,
      currentValue: props.goal!.currentValue,
      idealPerMonth: props.goal!.idealPerMonth,
    });

    feedbackModal.notify("Sua meta foi editada com sucesso");

    emits("success", true);
  } catch (error) {
    const axiosError = error as AxiosError;
    const response = axiosError.response?.data as ErrorResponse;
    feedback.value = response.msg;
    emits("success", false);
  }
}

onMounted(() => {
  getCategories();
});
</script>

<template>
  <div class="form_container">
    <InputField
      v-model="title"
      type="Text"
      label="Titulo"
      placeholder="Digite uma descrição"
      required
      :numeric="false"
    />
    <div class="form_container__objective_and_date">
      <InputField
        v-model="value"
        type="Text"
        :label="typeLabelMoney"
        placeholder="R$ 00,00"
        required
        numeric
      />
      <InputField
        v-model="date"
        class="form_container__objective_and_date__date"
        type="Date"
        :label="typeLabelDate"
        placeholder="dd/mm/aaaa"
        required
        :numeric="false"
      />
    </div>
    <SelectComponent
      v-if="$props.type != 'Goal'"
      :items="getItensCategory()"
      :selected="category"
      @update:selected="(newSelected: string) => { category = newSelected }"
    />
    <div class="form_container__inputs_error">
      <p
        v-if="title.length === 0"
        class="form_container__inputs_error"
      >
        Título não preenchido
      </p>
      <p
        v-else-if="value.length === 0"
        class="form_container__inputs_error"
      >
        {{ typeLabelMoney + " não está preenchido" }}
      </p>
      <p
        v-else-if="date.length === 0"
        class="form_container__inputs_error"
      >
        Data não preenchida
      </p>
      <p
        v-else-if="category.length === 0"
        class="form_container__inputs_error"
      >
        Categoria não selecionada
      </p>
      <p
        v-else
        class="form_container__inputs_error--placeholder"
      >
        #
      </p>
    </div>
    <div class="form_container__confirm_button">
      <ButtonComponent
        :color="getColor"
        text="CONFIRMAR"
        :disabled="title.length == 0
          || value.length == 0
          || date.length == 0
          || category.length == 0"
        @click="setAction"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../variables.scss";

.form_container {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &:last-child {
    gap: 1rem;
  }

  &__objective_and_date {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;

    &__date {
      max-width: 48%;
      min-width: 48%;
    }
  }

  &__inputs_error {
    color: $financi-red;
    font-weight: 500;
    text-align: left;
    margin-bottom: 0.9rem;
    font-size: 0.9rem;

    &--placeholder {
      visibility: hidden;
      margin-bottom: 0.9rem;
    }
  }

  &__confirm_button {
    display: flex;
    justify-content: center
  }
}

@media screen and ((min-width: 768px) and (min-height: 850px)){
  .form_container {
    &__inputs_error {
      font-size: 1rem;
    }
  }
}
</style>