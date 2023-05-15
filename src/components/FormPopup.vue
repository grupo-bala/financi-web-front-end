<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import axios, { AxiosError } from "axios";
import InputField from "../components/InputField.vue";
import SelectComponent from "../components/SelectComponent.vue";
import ButtonComponent from "./ButtonComponent.vue";

const description = ref("");
const value = ref("");
const date = ref("");
const itensCategory = ref<Category[]>([]);
const feedback = ref("");
const selected = ref("teste");
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

onMounted(() => {
  getCategories();
});
</script>

<template>
  <div class="form_container">
    <InputField
      v-model="description"
      type="Text"
      label="Descrição"
      placeholder="Digite uma descrição"
      required
      :numeric="false"
    />
    <div class="form_container__objective_and_date">
      <InputField
        v-model="value"
        type="Text"
        label="Objetivo"
        placeholder="R$ 00,00"
        required
        numeric
      />
      <InputField
        v-model="date"
        class="form_container__objective_and_date__date"
        type="Date"
        label="Data limite"
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
        v-if="description.length === 0"
        class="form_container__inputs_error"
      >
        Descrição não preenchida
      </p>
      <p
        v-else-if="value.length === 0"
        class="form_container__inputs_error"
      >
        Objetivo não preenchido
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
        :color="getColor"
        text="ADICIONAR"
        :disabled="description.length == 0
          || value.length == 0
          || date.length == 0"
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