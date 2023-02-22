<template>
  <div class="text-center">
    <div id="element-to-convert" class="p-5">
      <div style="width:100%; height:100%; padding:20px; text-align:center; border: 10px solid #222b32; background-color: #f2f3ed;">
        <div style="width:⁰0%; height:100%; padding:20px; text-align:center; border: 5px solid #222b32">
              <center>
                <h1>{{ $t("Certificate of Completion")}}</h1>
                <img width="175" src="../assets/trophy.png" />
                <br><br>
                <i>{{ $t("This is to certify that") }}</i>
                <br><br>
                <b> {{ user.name }} </b>
                <br><br>
                <i>{{ $t("has completed the course") }}</i>
                <br><br>
                <b>Social Media Awareness</b>
                <br><br>
                <p>{{ $t("with a score of") }}</p>
                <b>{{ points }}</b>
                <br><br>
                <i>{{ $t("on") }}</i>
                <br>
                <b> {{ new Date().toLocaleDateString() }} </b>
              </center>
        </div>
      </div>
    </div>

    <button class="btn btn-primary btn-lg mt-4" @click="exportToPDF">{{ $t("Save as PDF") }}</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import html2pdf from "html2pdf.js";

export default {
  name: "ExamCertificate",
  computed: {
    ...mapGetters(["user"]),
  },
  props: {
    points: {
      type: Number,
      required: true,
    },
  },
  methods: {
    exportToPDF() {
      html2pdf(document.getElementById("element-to-convert"), {
        margin: 1,
        filename: "certificate.pdf",
      });
    },
  },
};
</script>

<style>
</style>