<script setup lang="ts">
import { computed, ref } from "vue";
import { Categories } from "../types/Category";
import { displayDate } from "../utils/Dates";
import { Transaction } from "../types/Transaction";
import EditPopup from "./Popup/EditPopupComponent.vue";
import RemovePopup from "../components/Popup/RemoveOperationPopup.vue";

const props = defineProps<{
  transaction: Transaction,
}>();
const cardIsOpen = ref(false);
const editIsOpen = ref(false);
const removeIsOpen = ref(false);
const categoryToIcon = {
  "Saúde": "fa-briefcase-medical",
  "Alimentação": "md-foodbank-round",
  "Educação": "md-school-round",
  "Entretenimento": "gi-popcorn",
  "Vestuário": "gi-clothes",
  "Cuidados pessoais": "gi-comb",
};
const currentArrow = computed(() =>
  cardIsOpen.value ? "bi-chevron-up" : "bi-chevron-down",
);

function operationType(isEntry: boolean): "Income" | "Out" {
  if (isEntry) {
    return "Income";
  }

  return "Out";
}

function getIconNameFromCategoryId(id: number) {
  return categoryToIcon[
    Categories[id as keyof typeof Categories] as keyof typeof categoryToIcon
  ];
}

function getFormatedDate(date: string) {
  return displayDate(date);
}

function getNumberAsCurrency(value: string) {
  return Number(value)
    .toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}
</script>

<template>
  <div
    class="transaction_card"
    @click.self="cardIsOpen = !cardIsOpen"
  >
    <v-icon
      :name="currentArrow"
      class="transaction_card__arrow"
      @click="cardIsOpen = !cardIsOpen"
    />
    <div
      class="transaction_card__mid"
      @click="cardIsOpen = !cardIsOpen"
    >
      <div class="transaction_card__mid__left">
        <v-icon
          :name="getIconNameFromCategoryId(props.transaction.categoryId)"
          scale="2"
        />
        <div class="transaction_card__mid__left__info">
          <span class="transaction_card__mid__left__info__title">
            {{ transaction.title }}
          </span>
          <span class="transaction_card__mid__left__info__date">
            {{ getFormatedDate(props.transaction.date) }}
          </span>
        </div>
      </div>
      <div
        v-if="transaction.isEntry"
        class="transaction_card__mid__right--in"
      >
        + R$ {{ getNumberAsCurrency(props.transaction.value) }}
      </div>
      <div
        v-else
        class="transaction_card__mid__right--out"
      >
        - R$ {{ getNumberAsCurrency(props.transaction.value) }}
      </div>
    </div>
    <div
      v-if="cardIsOpen"
      class="transaction_card__bottom"
    >
      <button
        aria-label="editar transação"
        class="transaction_card__bottom__edit"
        @click="editIsOpen = true"
      >
        EDITAR
      </button>
      <button
        aria-label="remover transação"
        class="transaction_card__bottom__remove"
        @click="removeIsOpen = true"
      >
        <v-icon
          class="transaction_card__bottom__remove__trash"
          name="fa-trash"
        />
      </button>
    </div>
    <EditPopup
      v-if="editIsOpen"
      :operation="props.transaction"
      :type="operationType(props.transaction.isEntry)"
      @close="editIsOpen = false"
    />
    <RemovePopup
      v-if="removeIsOpen"
      :id="props.transaction.id"
      :type="props.transaction"
      @close="removeIsOpen = false"
    />
  </div>
</template>

<style scoped lang="scss">
@import "../variables.scss";

.transaction_card {
  background-color: $card-bg-color;
  padding: 1rem;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &__arrow {
    align-self: flex-end;
    margin-top: -.5rem;
    stroke: gray;
    stroke-width: .09rem;
    scale: .8;
  }

  &__mid {
    width: 100%;
    display: flex;
    align-items: center;
    padding-bottom: .3rem;

    &__left {
      display: flex;
      align-items: center;
      gap: .5rem;
      flex-grow: 1;
      overflow: hidden;

      &__info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        flex-grow: 1;

        &__title {
          font-weight: bold;
          font-size: .8em;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          max-width: 80%;
        }

        &__date {
          font-size: .8em;
          opacity: .5;
        }
      }
    }

    &__right {
      &--in {
        color: $financi-green;
      }

      &--out {
        color: $financi-red;
      }

      &--in, &--out {
        font-weight: bold;
        white-space: nowrap;
        font-size: .8em;
        justify-self: end;
        align-self: center;
      }
    }
  }

  &__bottom {
    display: flex;
    gap: .5rem;
    width: 100%;
    max-height: 38px;
    margin-top: .7rem;
    align-items: center;

    &__edit {
      width: 100%;
      font-size: .9rem;
      font-weight: 700;
      background-color: $small-card;
      border: none;
      cursor: pointer;
      color: $text-button-color;
      border-radius: $border-radius;
      outline: none;
      letter-spacing: 0.08em;
      padding: 0.5rem 1.5rem;
    }

    &__remove {
      border: none;
      outline: none;
      background-color: $financi-red;
      height: 100%;
      cursor: pointer;
      border-radius: $border-radius;
      padding: .5rem .5rem;

      &__trash {
        fill: $bg-color;
      }
    }
  }
}

@media (min-width: 800px) {
  .transaction_card {
    background-color: $child-card-bg-color;
  }
}
</style>