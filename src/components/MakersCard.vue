<template>
  <div
    v-if="isProject"
    :class="{ active }"
    class="project shadow-before"
  >
    <span class="project__title">{{ title }}</span>
    <span class="project__subtitle">{{ subtitle }}</span>
    <span v-if="launched" class="project__launched">
      launched at {{ launched }}
    </span>
  </div>
  <div v-else class="member shadow-before">
    <div class="text-container">
      <span class="member__title">{{ title }}</span>
      <div class="sub-container">
        <div class="img-container">
          <img src="../assets/SparcsLogo.svg" alt="Sparcs Logo">
        </div>
        <span class="member__subtitle">{{ subtitle }}</span>
      </div>
    </div>
    <span class="member__position">{{ position }}</span>
  </div>
</template>

<script>
export default {
  name: 'MakersCard',

  props: {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    position: String,
    active: Boolean,
    launched: String,
    isProject: Boolean
  }
}
</script>

<style lang="scss" scoped>
@import "@/theme.scss";

.shadow-before {
  position: relative;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 10px;
    opacity: 0;
    transition: opacity var(--duration) var(--background-timing);
  }

  &:hover::before {
    opacity: 1;
  }
}

.active {
  box-shadow: 0 0 15px 0 rgba(169, 169, 169, 0.2);

  &::before {
    transition: initial;
    opacity: 1;
  }
}

.project {
  width: 220px;
  height: 80px;
  border-radius: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &::before {
    box-shadow: 0 0 15px 0 rgba(169, 169, 169, 0.2);
  }

  &__title {
    font-size: 15px;
    font-weight: bold;
    line-height: 1.47;

    @include breakPoint(mobile) {
      font-size: 12px;
      text-align: center;
    }
  }

  &__subtitle {
    margin-top: 12.6px;
    font-size: 9px;
    font-weight: 500;
    line-height: 1.44;
    color: var(--grey-400);
  }

  &__launched {
    font-size: 9px;
    font-weight: 500;
    line-height: 1.44;
    color: var(--grey-400);
  }

  @include breakPoint(mobile) {
    width: 110px;
    height: 80px;
  }
}

.member {
  width: 280px;
  height: 120px;
  padding: 0 36px;
  border-radius: 10px;
  box-shadow: 0 0 15px 0 rgba(169, 169, 169, 0.16);
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  &::before {
    box-shadow: 0 0 20px 0 rgba(169, 169, 169, 0.32);
  }

  &__title {
    font-size: 20px;
    font-weight: bold;
    line-height: 1.5;

    @include breakPoint(mobile) {
      font-size: 14px;
      text-align: center;
    }
  }

  &__subtitle {
    font-size: 13px;
    font-weight: 800;
    line-height: 1.5;
    font-family: 'Raleway', sans-serif;
    color: #eba12a;
  }

  &__position {
    font-size: 10px;
    font-weight: 500;
    line-height: 1.5;
    color: var(--grey-400);

    @include breakPoint(mobile) {
      margin-top: 5px;
      text-align: center;
    }
  }

  .text-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .sub-container {
      margin-top: 4px;
      display: flex;
      flex-direction: row;
      align-items: flex-start;

      .img-container {
        width: 13px;
        height: 20px;
        overflow: hidden;

        img {
          width: 70px;
          max-width: initial;
          filter: invert(63%) sepia(71%) saturate(514%) hue-rotate(352deg) brightness(97%) contrast(91%);
        }
      }
    }

    @include breakPoint(mobile) {
      align-items: center;
    }
  }

  @include breakPoint(mobile) {
    width: 120px;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
