<script setup lang="ts">
import { ref } from "vue";
import OperationPopup from "../Popup/OperationPopupComponent.vue";

const popupIsOpen = ref(false);
</script>

<template>
  <div class="container">
    <div class="container_navButtons">
      <router-link
        to="/dashboard"
        class="container_navButtons_home"
        active-class="container_navButtons--active"
      >
        <v-icon
          name="fa-home"
          fill="white"
          scale="1.2"
        />
      </router-link>
      <router-link
        to="/transactions"
        class="container_navButtons_transaction"
        active-class="container_navButtons--active"
      >
        <v-icon
          name="fa-exchange-alt"
          fill="white"
          scale="1.2"
        />
      </router-link>

      <button
        aria-label="nova operação"
        @click="popupIsOpen = true"
      >
        <Teleport to="body">
          <OperationPopup
            v-if="popupIsOpen"
            @close="popupIsOpen = false"
          />
        </Teleport>
        <div class="container_navButtons_addButton">
          +
        </div>
      </button>
      <router-link
        to="/courses"
        class="container_navButtons_courses"
        active-class="container_navButtons--active"
      >
        <v-icon
          name="fa-play-circle"
          fill="white"
          scale="1.2"
        />
      </router-link>
      <router-link
        to="/reports"
        class="container_navButtons_chart"
        active-class="container_navButtons--active"
      >
        <v-icon
          name="fa-chart-bar"
          fill="white"
          scale="1.2"
        />
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">

@import "../../variables.scss";
.container {
  width: 20rem;
  border-radius: $border-radius;
  background-color: #1E1E1E;
  box-shadow: $box-shadow;
  display: flex;
  position: fixed;
  bottom: 7px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;

  &_navButtons {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 0.7rem 0;

    &_home {
      padding-left: 7%;
      background-color: #1E1E1E;

    }

    &_chart {
      padding-right: 7%;
      background-color: #1E1E1E;

    }

    &_courses {
      padding-left: 7%;
      background-color: #1E1E1E;
    }

    &_transaction {
      padding-right: 7%;
      background-color: #1E1E1E;
    }

    &_addButton {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: -10px;
      left: 129px;
      border-radius: 50%;
      font-size: 3.5em;
      color: $financi-green;
      height: 1.5em;
      width: 1.5em;
      background-color: #383838;
      box-shadow: $box-shadow;
      cursor: pointer;
    }

    &--active svg {
      fill: $financi-green;
    }
  }
}

button {
  border: none;
}

</style>