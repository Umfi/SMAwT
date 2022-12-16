<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-8 text-center m-auto">
        <div class="card">
          <div class="card-header">
            <h1>{{ $t("Create your user") }}</h1>
          </div>
          <div class="card-body">
            <div class="avatar">
              <avataaars
                :isCircle="isCircle"
                :skinColor="skinColor"
                :topType="topType"
                :topColor="topColor"
                :hairColor="hairColor"
                :eyeType="'Default'"
                :facialHairType="'blank'"
                :mouthType="mouthType"
                eyebrowType="DefaultNatural"
                :accessoriesType="accessoriesType"
                :clotheType="clotheType"
                :clotheColor="clotheColor"
                ref="avatar"
              ></avataaars>
              <button
                type="button"
                class="btn btn-secondary"
                @click="changeAvatar"
              >
                <i class="fas fa-random"></i>
              </button>
            </div>

            <div class="row">
              <div class="col">
                <button
                  type="button"
                  class="btn btn-secondary w-100"
                  @click="changeSkinColor"
                >
                  {{ $t("Skin color") }}
                </button>
              </div>
              <div class="col">
                <button
                  type="button"
                  class="btn btn-secondary w-100"
                  @click="changeTopType"
                >
                  {{ $t("Hairstyle") }}
                </button>
              </div>
              <div class="col">
                <button
                  type="button"
                  class="btn btn-secondary w-100"
                  @click="changeTopColor"
                  v-show="showTopColorOption"
                >
                  {{ $t("Headgear color") }}
                </button>
                <button
                  type="button"
                  class="btn btn-secondary w-100"
                  @click="changeHairColor"
                  v-show="!showTopColorOption && topType != 'NoHair'"
                >
                  {{ $t("Hair color") }}
                </button>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col">
                <button
                  type="button"
                  class="btn btn-secondary w-100"
                  @click="changeMouthType"
                >
                  {{ $t("Mouth") }}
                </button>
              </div>
              <div class="col">
                <button
                  type="button"
                  class="btn btn-secondary w-100"
                  @click="changeClotheType"
                >
                  {{ $t("Clothes") }}
                </button>
              </div>

              <div class="col">
                <button
                  type="button"
                  class="btn btn-secondary w-100"
                  @click="changeClotheColor"
                >
                  {{ $t("Clothes color") }}
                </button>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col">
                <button
                  type="button"
                  class="btn btn-secondary w-100"
                  @click="changeAccessoriesType"
                >
                  {{ $t("Glasses") }}
                </button>
              </div>
            </div>

            <hr>
            <input
              type="text"
              class="form-control mt-4 w-50 m-auto"
              id="name"
              :placeholder="$t('Enter your name')"
              v-model="username"
            />
          </div>
          <div class="card-footer">
            <button
              type="button"
              class="btn btn-primary btn-lg mt-4"
              @click="start"
              :disabled="username.length == 0"
            >
              {{ $t("Start") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avataaars from "vuejs-avataaars";

export default {
  name: "SetupView",
  components: {
    Avataaars,
  },
  data() {
    return {
      isCircle: true,
      username: "",
      /////////////
      skinColors: [
        "Tanned",
        "Yellow",
        "Pale",
        "Light",
        "Brown",
        "DarkBrown",
        "Black",
      ],
      topTypes: [
        "NoHair",
        "Hat",
        "Hijab",
        "Turban",
        "WinterHat1",
        "WinterHat2",
        "WinterHat3",
        "WinterHat4",
        "LongHairBigHair",
        "LongHairBob",
        "LongHairBun",
        "LongHairCurly",
        "LongHairCurvy",
        "LongHairDreads",
        "LongHairFrida",
        "LongHairFro",
        "LongHairFroBand",
        "LongHairNotTooLong",
        "LongHairShavedSides",
        "LongHairMiaWallace",
        "LongHairStraight",
        "LongHairStraight2",
        "LongHairStraightStrand",
        "ShortHairDreads01",
        "ShortHairDreads02",
        "ShortHairFrizzle",
        "ShortHairShaggyMullet",
        "ShortHairShortCurly",
        "ShortHairShortFlat",
        "ShortHairShortRound",
        "ShortHairShortWaved",
        "ShortHairSides",
        "ShortHairTheCaesar",
        "ShortHairTheCaesarSidePart",
      ],
      hairColors: [
        "Auburn",
        "Black",
        "Blonde",
        "BlondeGolden",
        "Brown",
        "BrownDark",
        "PastelPink",
        "Platinum",
        "Red",
        "SilverGray",
      ],
      topColors: [
        "Black",
        "Blue01",
        "Blue02",
        "Blue03",
        "Gray01",
        "Gray02",
        "Heather",
        "PastelBlue",
        "PastelGreen",
        "PastelOrange",
        "PastelRed",
        "PastelYellow",
        "Pink",
        "Red",
        "White",
      ],
      mouthTypes: [
        "Concerned",
        "Default",
        "Disbelief",
        "Eating",
        "Grimace",
        "Serious",
        "Smile",
        "Tongue",
        "Twinkle",
      ],
      clotheTypes: [
        "CollarSweater",
        "GraphicShirt",
        "Hoodie",
        "Overall",
        "ShirtCrewNeck",
        "ShirtScoopNeck",
        "ShirtVNeck",
      ],
      clotheColors: [
        "Black",
        "Blue01",
        "Blue02",
        "Blue03",
        "Gray01",
        "Gray02",
        "Heather",
        "PastelBlue",
        "PastelGreen",
        "PastelOrange",
        "PastelRed",
        "PastelYellow",
        "Pink",
        "Red",
        "White",
      ],
      accessoriesTypes: [
        "Blank",
        "Kurt",
        "Prescription01",
        "Prescription02",
        "Round",
        "Sunglasses",
        "Wayfarers",
      ],
      ///////////
      skinColor: "Light",
      topType: "ShortHairShortFlat",
      hairColor: "Blonde",
      topColor: "Black",
      mouthType: "Smile",
      clotheType: "ShirtCrewNeck",
      clotheColor: "PastelBlue",
      accessoriesType: "Blank",
    };
  },
  computed: {
    showTopColorOption() {
      if (
        [
          "Hat",
          "Hijab",
          "Turban",
          "WinterHat1",
          "WinterHat2",
          "WinterHat3",
          "WinterHat4",
        ].includes(this.topType)
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.changeAvatar();
  },
  methods: {
    changeAvatar() {
      this.changeStyle("skinColor", this.skinColors, true);
      this.changeStyle("topType", this.topTypes, true);
      this.changeStyle("hairColor", this.hairColors, true);
      this.changeStyle("topColor", this.topColors, true);
      this.changeStyle("mouthType", this.mouthTypes, true);
      this.changeStyle("clotheType", this.clotheTypes, true);
      this.changeStyle("clotheColor", this.clotheColors, true);
      this.changeStyle("accessoriesType", this.accessoriesTypes, true);
    },
    changeStyle(field, fields, random = false) {
      const index = fields.indexOf(this[field]);
      let nextIndex = index + 1;

      if (random) {
        nextIndex = Math.floor(Math.random() * fields.length);
      }

      if (nextIndex >= fields.length) {
        this[field] = fields[0];
      } else {
        this[field] = fields[nextIndex];
      }
    },
    changeSkinColor() {
      this.changeStyle("skinColor", this.skinColors, false);
    },
    changeTopType() {
      this.changeStyle("topType", this.topTypes, false);
    },
    changeHairColor() {
      this.changeStyle("hairColor", this.hairColors, false);
    },
    changeTopColor() {
      this.changeStyle("topColor", this.topColors, false);
    },
    changeMouthType() {
      this.changeStyle("mouthType", this.mouthTypes, false);
    },
    changeClotheType() {
      this.changeStyle("clotheType", this.clotheTypes, false);
    },
    changeClotheColor() {
      this.changeStyle("clotheColor", this.clotheColors, false);
    },
    changeAccessoriesType() {
      this.changeStyle("accessoriesType", this.accessoriesTypes, false);
    },
    start() {
      const user = {
        name: this.username,
        avatar: `data:image/svg+xml;base64,${btoa(
          unescape(encodeURIComponent(this.$refs.avatar.$el.outerHTML))
        )}`,
      };

      this.isCircle = false;

      this.$nextTick(() => {
        user.image = `data:image/svg+xml;base64,${btoa(
          unescape(encodeURIComponent(this.$refs.avatar.$el.outerHTML))
        )}`;

        this.$store.dispatch("startGame", user).then(() => {
          this.$router.push("/levels");
        });
      });
    },
  },
};
</script>
<style scoped>
.avatar {
  margin: 0 auto;
  width: 200px;
  height: 200px;
  margin-bottom: 80px;
}
</style>
