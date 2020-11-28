<template>
  <a>
    <div :class="'makers-card-1 shadow-before' + (active ? ' active' : '')" v-if="cardType === '1'">
      <span class="title-1">{{ title }}</span>
      <span class="subtitle-1">{{ subtitle }}</span>
    </div>

    <div class="makers-card-2 shadow-before" v-if="cardType === '2'">
      <div class="text-container">
        <span class="title-2">{{ title }}</span>
        <div class="sub-container">
          <div class="img-container">
            <img src="../assets/SparcsLogo.svg" alt="s"/>
          </div>
          <span class="subtitle-2">{{ subtitle }}</span>
        </div>
      </div>
      <span class="subtitle-3">{{ position }}</span>
    </div>
  </a>
</template>

<script>
export default {
  name: 'MakersCard',
  props: {
    title: {type: String, required: true},
    subtitle: {type: String, required: true},
    cardType: {type: String, required: true},
    position: {type: String},
    active: {type: String}
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

  .makers-card-1 {
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

    .title-1 {
      font-size: 15px;
      font-weight: bold;
      line-height: 1.47;
    }

    .subtitle-1 {
      margin-top: 12.6px;
      font-size: 9px;
      font-weight: 500;
      line-height: 1.44;
      color: var(--grey-400);
    }

    @include breakPoint(mobile) {
      width: 110px;
      height: 80px;
      .title-1 {
        font-size: 12px;
        text-align: center;
      }
    }
  }

  .makers-card-2 {
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

    .text-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .title-2 {
        font-size: 20px;
        font-weight: bold;
        line-height: 1.5;
      }

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

        .subtitle-2 {
          font-size: 13px;
          font-weight: 800;
          line-height: 1.5;
          font-family: 'Raleway', sans-serif;
          color: #eba12a;
        }
      }

      @include breakPoint(mobile) {
        align-items: center;

        .title-2 {
          font-size: 14px;
          text-align: center;
        }
      }
    }

    .subtitle-3 {
      font-size: 10px;
      font-weight: 500;
      line-height: 1.5;
      color: var(--grey-400);
    }

    @include breakPoint(mobile) {
      width: 120px;
      flex-direction: column;
      justify-content: center;
      .subtitle-3 {
        margin-top: 5px;
        text-align: center;
      }
    }
  }

</style>
