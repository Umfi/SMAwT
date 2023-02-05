<template>
<div>
    <div class="alert alert-primary" role="alert">
          {{ $t('Create your own passwords! Remember spelling, numbers and special characters! The passwords should be different from each other.') }}
        </div>
        
    <div>
        <label for="pw-input" class="form-label">{{ $t("Enter a secure password") }}</label>
        <input type="text" class="form-control" id="pw-input" v-model="input" />
    </div>
</div>
</template>

<script>

const zxcvbn = require('zxcvbn');

export default {
    name: "PasswortStrengthChecker",
    data() {
        return {
            input: "",
        };
    },
    methods: {
        check() {
            const result = zxcvbn(this.input);
            const score = result.score;

            if (score === 0) {
                 return  {
                    status: 0,
                    message: "Your password is very weak. It is too guessable."
                }
            } else if (score === 1) {
                return  {
                    status: 1,
                    message: "Your password is weak. It is very guessable."
                }
            } else if (score === 2) {
                return  {
                    status: 2,
                    message: "Your password is okay. But it is somewhat guessable."
                }
            } else if (score === 3) {
                return  {
                    status: 3,
                    message: "Your password is strong. It is safely unguessable."
                }
            } else if (score === 4) {
                return  {
                    status: 4,
                    message: "Your password is very strong. It is very unguessable."
                }
            }
        }
    }
}
</script>
