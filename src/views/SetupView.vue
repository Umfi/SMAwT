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
                <div class="btn-group w-100" role="group">
                  <button type="button" class="btn btn-primary" @click="changeSkinColor('prev')">«</button>
                  <button type="button" class="btn btn-secondary disabled">{{ $t("Skin color") }}</button>
                  <button type="button" class="btn btn-primary" @click="changeSkinColor('next')">»</button>
                </div>
              </div>
              <div class="col">
                  <div class="btn-group w-100" role="group">
                    <button type="button" class="btn btn-primary" @click="changeTopType('prev')">«</button>
                    <button type="button" class="btn btn-secondary disabled">{{ $t("Hairstyle") }}</button>
                    <button type="button" class="btn btn-primary" @click="changeTopType('next')">»</button>
                  </div>
              </div>
              <div class="col">
                <div class="btn-group w-100" role="group" v-show="showTopColorOption">
                  <button type="button" class="btn btn-primary" @click="changeTopColor('prev')">«</button>
                  <button type="button" class="btn btn-secondary disabled">{{ $t("Headgear color") }}</button>
                  <button type="button" class="btn btn-primary" @click="changeTopColor('next')">»</button>
                </div>

                <div class="btn-group w-100" role="group" v-show="!showTopColorOption && topType != 'NoHair'">
                    <button type="button" class="btn btn-primary" @click="changeHairColor('prev')">«</button>
                    <button type="button" class="btn btn-secondary disabled">{{ $t("Hair color") }}</button>
                    <button type="button" class="btn btn-primary" @click="changeHairColor('next')">»</button>
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col">
                <div class="btn-group w-100" role="group">
                  <button type="button" class="btn btn-primary" @click="changeMouthType('prev')">«</button>
                  <button type="button" class="btn btn-secondary disabled">{{ $t("Mouth") }}</button>
                  <button type="button" class="btn btn-primary" @click="changeMouthType('next')">»</button>
                </div>
              </div>
              <div class="col">
                <div class="btn-group w-100" role="group">
                  <button type="button" class="btn btn-primary" @click="changeClotheType('prev')">«</button>
                  <button type="button" class="btn btn-secondary disabled">{{ $t("Clothes") }}</button>
                  <button type="button" class="btn btn-primary" @click="changeClotheType('next')">»</button>
                </div>
              </div>

              <div class="col">
                <div class="btn-group w-100" role="group">
                  <button type="button" class="btn btn-primary" @click="changeClotheColor('prev')">«</button>
                  <button type="button" class="btn btn-secondary disabled">{{ $t("Clothes color") }}</button>
                  <button type="button" class="btn btn-primary" @click="changeClotheColor('next')">»</button>
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col">
                <div class="btn-group w-100" role="group">
                  <button type="button" class="btn btn-primary" @click="changeAccessoriesType('prev')">«</button>
                  <button type="button" class="btn btn-secondary disabled">{{ $t("Glasses") }}</button>
                  <button type="button" class="btn btn-primary" @click="changeAccessoriesType('next')">»</button>
                </div>
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
    changeStyle(field, fields, random = false, direction = 'next') {
      const index = fields.indexOf(this[field]);

      let nextIndex;
      if (direction == 'next') {
        nextIndex = index + 1;
      } else {
        nextIndex = index - 1;
        if (nextIndex < 0) {
          nextIndex = fields.length - 1;
        }
      }

      if (random) {
        nextIndex = Math.floor(Math.random() * fields.length);
      }

      if (nextIndex >= fields.length) {
        this[field] = fields[0];
      } else {
        this[field] = fields[nextIndex];
      }
    },
    changeSkinColor(dir) {
      this.changeStyle("skinColor", this.skinColors, false, dir);
    },
    changeTopType(dir) {
      this.changeStyle("topType", this.topTypes, false, dir);
    },
    changeHairColor(dir) {
      this.changeStyle("hairColor", this.hairColors, false, dir);
    },
    changeTopColor(dir) {
      this.changeStyle("topColor", this.topColors, false, dir);
    },
    changeMouthType(dir) {
      this.changeStyle("mouthType", this.mouthTypes, false, dir);
    },
    changeClotheType(dir) {
      this.changeStyle("clotheType", this.clotheTypes, false, dir);
    },
    changeClotheColor(dir) {
      this.changeStyle("clotheColor", this.clotheColors, false, dir);
    },
    changeAccessoriesType(dir) {
      this.changeStyle("accessoriesType", this.accessoriesTypes, false, dir);
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
