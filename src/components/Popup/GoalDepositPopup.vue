<script setup lang="ts">
import axios from "axios";
import { Goal } from "../../types/Goal";
import Popup from "./PopupComponent.vue";
import { ref } from "vue";
import InputField from "../Inputs/InputField.vue";
import ButtonComponent from "../ButtonComponent.vue";
import router from "../../router";
import { useGoalsStore } from "../../stores/goalsStore";

const props = defineProps<{
  goal: Goal,
}>();
const envUrl = import.meta.env.VITE_API_URL;
const depositValue = ref("");
const goals = useGoalsStore();

async function depositGoal() {
  try {
    await axios.put(`${envUrl}/update-goal`, {
      id: props.goal.id,
      title: props.goal.title,
      currentValue: Number(
        depositValue.value
          .replace(".", "")
          .replace(",", "."),
      ) + Number(props.goal.currentValue),
      totalValue: Number(props.goal.totalValue),
      deadline: new Date(props.goal.deadline),
    });
    goals.edit({
      id: props.goal.id,
      title: props.goal.title,
      currentValue: (
        Number(
          depositValue.value.replace(".", "").replace(",", "."),
        ) + Number(props.goal.currentValue)
      ).toString(),
      deadline: props.goal.deadline,
      idealPerMonth: props.goal.idealPerMonth,
      totalValue: props.goal.totalValue,
      userId: props.goal.userId,
    });
  } catch (error) {
    router.push("/ops");
  }
}
</script>

<template>
  <Popup
    v-slot="Parent"
    show-close
  >
    <div class="deposit_container">
      <p class="deposit_container__title">
        Depositar
      </p>
      <InputField
        v-model="depositValue"
        type="Text"
        label="Valor"
        placeholder="R$ 00,00"
        :required="false"
        numeric
      />
      <ButtonComponent
        id="depositar na meta"
        color="blue"
        text="ADICIONAR"
        :disabled="depositValue.length === 0"
        @click="[depositGoal(), Parent.onClose()]"
      />
    </div>
  </Popup>
</template>

<style scoped lang="scss">
.deposit_container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;

  &__title {
    font-size: 1.2rem;
    font-weight: bold;
  }
}
</style>