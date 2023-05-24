<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import axios, { AxiosError } from "axios";
import InputField from "../components/InputField.vue";
import SelectComponent from "../components/SelectComponent.vue";
import ButtonComponent from "./ButtonComponent.vue";

const title = ref("");
const value = ref("");
const date = ref("");
const itensCategory = ref<Category[]>([]);
const feedback = ref("");
const selected = ref("");
const envUrl = import.meta.env.VITE_API_URL;
type ErrorResponse = {msg: string};
type SuccessResponse = {
  data: Category[],
}
type Category = {
  id: number,
  name: string,
}

const getColor = computed(() => {
  if (props.type === "Out") {
    return "red";
  } else if (props.type === "Goal") {
    return "blue";
  }

  return "green";
});

const props = defineProps<{
  type: "Income" | "Out" | "Goal"
}>();

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

async function setPostType() {
  if (props.type === "Goal") {
    postGoal();
  } else {
    postTransaction();
  }
}

async function postGoal() {
  try {
    await axios.post(`${envUrl}/add-goal`, {
      totalValue: value.value,
      title: title.value,
      deadline: new Date(date.value),
    });
    emits("success", true);
  } catch (error) {
    const axiosError = error as AxiosError;
    const response = axiosError.response?.data as ErrorResponse;
    feedback.value = response.msg;
    emits("success", false);
  }
}

async function postTransaction() {
  try {
    await axios.post(`${envUrl}/add-transaction`, {
      value: Number(value.value.replace(".", "").replace(",", ".")),
      date: new Date(date.value),
      categoryId: itensCategory.value.find((category) => {
        return category.name === selected.value;
      })?.id,
      title: title.value,
      description: "",
      isEntry: props.type === "Income" ? true : false,
    });
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
      :items="getItensCategory()"
      :selected="selected"
      @update:selected="(newSelected: string) => { selected = newSelected }"
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
        v-else-if="selected.length === 0"
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
        text="ADICIONAR"
        :disabled="title.length == 0
          || value.length == 0
          || date.length == 0
          || selected.length == 0"
        @click="setPostType"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";

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