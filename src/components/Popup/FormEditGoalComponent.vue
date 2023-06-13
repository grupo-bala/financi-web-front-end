<script setup lang="ts">
import { ref } from "vue";
import axios, { AxiosError } from "axios";
import InputField from "../Inputs/InputField.vue";
import ButtonComponent from "../ButtonComponent.vue";
import { Goal } from "../../types/Goal";

const sliceStart = 0;
const sliceEnd = 10;
const feedback = ref("");
const envUrl = import.meta.env.VITE_API_URL;
type ErrorResponse = {msg: string};

const props = defineProps<{
  type: "Goal"
  goal?: Goal
}>();

const title = ref(props.goal!.title);
const value = ref(props.goal!.totalValue);
const date = ref(props.goal!.deadline.slice(sliceStart, sliceEnd));

const emits = defineEmits<{
  (e: "success", value: boolean): boolean
}>();

const typeLabelMoney = props.type === "Goal" ? "Objetivo" : "Valor";
const typeLabelDate = props.type === "Goal" ? "Data limite" : "Data";

async function setAction() {
  editGoal();
}

async function editGoal() {
  try {
    await axios.put(`${envUrl}/update-goal`, {
      id: props.goal!.id,
      title: title.value,
      currentValue: Number(
        props.goal!.currentValue.replace(".", "").replace(",", ".")),
      totalValue: Number(value.value.replace(".", "").replace(",", ".")),
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
        v-else
        class="form_container__inputs_error--placeholder"
      >
        #
      </p>
    </div>
    <div class="form_container__confirm_button">
      <ButtonComponent
        color="blue"
        text="CONFIRMAR"
        :disabled="title.length == 0
          || value.length == 0
          || date.length == 0"
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