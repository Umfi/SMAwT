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
            </div>

            <ul class="nav nav-tabs nav-fill bg-grey">
              <li class="nav-item">
                <a :class="step == 1 ? 'nav-link active' : 'nav-link'" href="#" @click="step = 1">{{ $t("Look") }}</a>
              </li>
              <li class="nav-item">
                <a :class="step == 2 ? 'nav-link active' : 'nav-link'" href="#" @click="step = 2">{{ $t("Data") }}</a>
              </li>
            </ul>


            <div v-show="step == 1" class="border border-1 border-top-0 p-2">
              <div class="row">
                <div class="col mt-1">
                  <div class="btn-group w-100" role="group">
                    <button type="button" class="btn btn-outline-primary" @click="changeSkinColor('prev')">«</button>
                    <button type="button" class="btn btn-primary disabled">{{ $t("Skin color") }}</button>
                    <button type="button" class="btn btn-outline-primary" @click="changeSkinColor('next')">»</button>
                  </div>
                </div>
                <div class="col mt-1">
                    <div class="btn-group w-100" role="group">
                      <button type="button" class="btn btn-outline-primary" @click="changeTopType('prev')">«</button>
                      <button type="button" class="btn btn-primary disabled">{{ $t("Hairstyle") }}</button>
                      <button type="button" class="btn btn-outline-primary" @click="changeTopType('next')">»</button>
                    </div>
                </div>
                <div class="col mt-1">
                  <div class="btn-group w-100" role="group" v-show="showTopColorOption">
                    <button type="button" class="btn btn-outline-primary" @click="changeTopColor('prev')">«</button>
                    <button type="button" class="btn btn-primary disabled">{{ $t("Headgear color") }}</button>
                    <button type="button" class="btn btn-outline-primary" @click="changeTopColor('next')">»</button>
                  </div>

                  <div class="btn-group w-100" role="group" v-show="!showTopColorOption && topType != 'NoHair'">
                      <button type="button" class="btn btn-outline-primary" @click="changeHairColor('prev')">«</button>
                      <button type="button" class="btn btn-primary disabled">{{ $t("Hair color") }}</button>
                      <button type="button" class="btn btn-outline-primary" @click="changeHairColor('next')">»</button>
                  </div>
                </div>
              </div>

              <div class="row mt-3">
                <div class="col mt-1">
                  <div class="btn-group w-100" role="group">
                    <button type="button" class="btn btn-outline-primary" @click="changeMouthType('prev')">«</button>
                    <button type="button" class="btn btn-primary disabled">{{ $t("Mouth") }}</button>
                    <button type="button" class="btn btn-outline-primary" @click="changeMouthType('next')">»</button>
                  </div>
                </div>
                <div class="col mt-1">
                  <div class="btn-group w-100" role="group">
                    <button type="button" class="btn btn-outline-primary" @click="changeClotheType('prev')">«</button>
                    <button type="button" class="btn btn-primary disabled">{{ $t("Clothes") }}</button>
                    <button type="button" class="btn btn-outline-primary" @click="changeClotheType('next')">»</button>
                  </div>
                </div>

                <div class="col mt-1">
                  <div class="btn-group w-100" role="group">
                    <button type="button" class="btn btn-outline-primary" @click="changeClotheColor('prev')">«</button>
                    <button type="button" class="btn btn-primary disabled">{{ $t("Clothes color") }}</button>
                    <button type="button" class="btn btn-outline-primary" @click="changeClotheColor('next')">»</button>
                  </div>
                </div>
              </div>

              <div class="row mt-3">
                <div class="col mt-1">
                  <div class="btn-group w-100" role="group">
                    <button type="button" class="btn btn-outline-primary" @click="changeAccessoriesType('prev')">«</button>
                    <button type="button" class="btn btn-primary disabled w-75">{{ $t("Glasses") }}</button>
                    <button type="button" class="btn btn-outline-primary" @click="changeAccessoriesType('next')">»</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-show="step == 2" class="border border-1 border-top-0 p-2">
              <div class="mb-3">
                <label for="name" class="form-label">{{ $t("What is your name?") }}</label>
                <input type="text" class="form-control" id="name" v-model="username" />
              </div>
              <div class="mb-3">
                <label for="gender" class="form-label">{{ $t("What is your gender?") }}</label>
                <select class="form-select form-select-lg mb-3" id="gender" v-model="gender">
                  <option value="" selected>{{ $t("---") }}</option>
                  <option :value="$t('Male')">{{ $t("Male") }}</option>
                  <option :value="$t('Female')">{{ $t("Female") }}</option>
                  <option :value="$t('Other')">{{ $t("Other") }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="age" class="form-label">{{ $t("What is your age?") }}</label>
                <input type="number" class="form-control" id="age" v-model="age" />
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">{{ $t("Where do you live?") }}</label>
                <input type="text" class="form-control" id="address" v-model="address" />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">{{ $t("What is your e-mail address?") }}</label>
                <input type="email" class="form-control" id="email" v-model="email" />
              </div>
            </div>

          </div>
          <div class="card-footer">
             <button
              v-show="step > 1"
              type="button"
              class="btn btn-primary btn-lg mt-4 float-start"
              @click="step--"
            >
              {{ $t("Back") }}
            </button>

            <button
              v-show="step != 2"
              type="button"
              class="btn btn-primary btn-lg mt-4 float-end"
              @click="step++"
            >
              {{ $t("Continue") }}
            </button>

            <button
              v-show="step == 2"
              type="button"
              class="btn btn-primary btn-lg mt-4 float-end"
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
      step: 1,
      isCircle: true,
      username: "",
      age: "",
      gender: "",
      address: "",
      email: "",
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
        data: {
          age: this.age,
          gender: this.gender,
          address: this.address,
          email: this.email,
          interviewData: []
        }
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
  margin-bottom: 50px;
}
</style>
