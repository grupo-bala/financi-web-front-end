<script setup lang="ts">
import Popup from "./PopupComponent.vue";
import ButtonComponent from "../ButtonComponent.vue";
import { Transaction } from "../../types/Transaction";
import { Goal } from "../../types/Goal";
import axios from "axios";
import router from "../../router";
import { useGoalsStore } from "../../stores/goalsStore";
import { useTransactionsStore } from "../../stores/transactionsStore";
import { useFeedbackStore } from "../../stores/feedbackStore";
import { useProfileStore } from "../../stores/userStore";

const props = defineProps<{
  type: Transaction | Goal,
  id: number,
}>();
const envUrl = import.meta.env.VITE_API_URL;
const goals = useGoalsStore();
const transactions = useTransactionsStore();
const feedbackModal = useFeedbackStore();
const profile = useProfileStore();

function setRemoveType(): void {
  "deadline" in props.type ? removeGoal() : removeTransaction();
}

async function removeGoal() {
  try {
    await axios.delete(`${envUrl}/remove-goal`, {
      data: {
        goalId: props.id,
      },
    });

    goals.remove(props.id);
    feedbackModal.notify("Sua meta foi removida com sucesso");
  } catch (error) {
    router.push("/ops");
  }
}

async function removeTransaction() {
  try {
    await axios.delete(`${envUrl}/remove-transaction`, {
      data: {
        id: props.id,
      },
    });

    profile.removeTransaction(transactions.data.find((t) => {
      return t.id === props.id;
    })!);
    transactions.remove(props.id);
    feedbackModal.notify("Sua transação foi removida com sucesso");
  } catch (error) {
    router.push("/ops");
  }
}
</script>

<template>
  <Popup
    v-slot="parent"
    :show-close="false"
  >
    <div class="remove_container">
      <h3
        class="remove_container__title"
      >
        Deseja mesmo remover essa {{
          "deadline" in props.type ? "meta" : "transação"
        }}?
      </h3>
      <div class="remove_container__buttons">
        <ButtonComponent
          id="confirmar remoção"
          color="green"
          text="SIM"
          :disabled="false"
          @click="[setRemoveType(), parent.onClose()]"
        />
        <button
          aria-label="cancelar remoção"
          class="remove_container__buttons__not"
          @click="parent.onClose()"
        >
          NÃO
        </button>
      </div>
    </div>
  </Popup>
</template>

<style scoped lang="scss">
@import "../../variables.scss";

.remove_container {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &__title {
    text-align: center;
  }

  &__buttons {
    display: flex;
    gap: 2rem;

    &__not {
      outline: none;
      border: none;
      background-color: transparent;
      color: $financi-red;
      font-weight: bold;
      letter-spacing: 0.08rem;
      font-size: 0.9rem;
      width: 65%;
      cursor: pointer;
    }
  }
}
</style>