<template>
  <v-flex xs4 class="mt-4">
    <v-timeline align-top>
      <v-timeline-item>
        <template v-slot:icon>
          <v-avatar>
            <img :src="user.avatar_url" />
          </v-avatar>
        </template>

        <v-layout>
          <v-flex class="pr-0">
            <div class="body-1 font-weight-medium">{{ user.name }}</div>
            <div>
              <span class="yellow--text text--darken-2 body-2 font-weight-bold">
                550
              </span>
              <span class="body-1">Commits</span>
            </div>
            <div>
              <span class="red--text body-2 font-weight-bold">
                550
              </span>
              <span class="body-1">Fixed Issues</span>
            </div>
          </v-flex>
        </v-layout>
      </v-timeline-item>

      <v-timeline-item color="teal lighten-3" small>
        <v-layout wrap pt-3>
          <v-flex xs3>
            <strong>3-4pm</strong>
          </v-flex>
          <v-flex>
            <strong>Design Stand Up</strong>
            <div class="caption mb-2">Hangouts</div>
            <v-avatar>
              <v-img
                src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Kurt&hairColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Gray01&graphicType=Skull&eyeType=Wink&eyebrowType=RaisedExcitedNatural&mouthType=Disbelief&skinColor=Brown"
              ></v-img>
            </v-avatar>
            <v-avatar>
              <v-img
                src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=BlazerSweater&clotheColor=Black&eyeType=Default&eyebrowType=FlatNatural&mouthType=Default&skinColor=Tanned"
              ></v-img>
            </v-avatar>
            <v-avatar>
              <v-img
                src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Pale"
              ></v-img>
            </v-avatar>
          </v-flex>
        </v-layout>
      </v-timeline-item>

      <v-timeline-item color="pink" small>
        <v-layout pt-3>
          <v-flex xs3>
            <strong>12pm</strong>
          </v-flex>
          <v-flex>
            <strong>Lunch break</strong>
          </v-flex>
        </v-layout>
      </v-timeline-item>

      <v-timeline-item color="teal lighten-3" small>
        <v-layout pt-3>
          <v-flex xs3>
            <strong>9-11am</strong>
          </v-flex>
          <v-flex>
            <strong>Finish Home Screen</strong>
            <div class="caption">Web App</div>
          </v-flex>
        </v-layout>
      </v-timeline-item>
    </v-timeline>
  </v-flex>
</template>

<script>
export default {
  name: 'User',
  props: {
    user: {
      default: () => {
        return {}
      },
      type: Object
    }
  }
}
</script>

<style scoped></style>
