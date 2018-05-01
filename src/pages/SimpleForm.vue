<template>
  <div role="main" class="container">
    <div class="py-2 text-center">
      <h2>simple form</h2>
    </div>
    <div class="row justify-content-center">
      <form action="#" method="post" class="needs-validation" novalidate>
        <!-- text -->
        <div class="form-group row">
          <label class="col-sm-2 col-form-label" for="singleLineText">Single Line Text</label>
          <div class="col-sm-7 mb-3">
            <input type="text" class="form-control singleLineText" v-model.trim="simpleForm.singleLineText">
            <div class="invalid-feedback">error</div>
            <div class="valid-feedback">success</div>
          </div>
          <div class="col-sm-3">
            <span>{{ simpleForm.singleLineText }}</span>
          </div>
        </div>
        <!-- text area -->
        <div class="form-group row">
          <label class="col-sm-2 col-form-label" for="multiLineText">Text Area</label>
          <div class="col-sm-7 mb-3">
            <textarea rows="3" cols="80" class="form-control multiLineText" v-model.trim="simpleForm.multiLineText"/>
            <div class="invalid-feedback">error</div>
            <div class="valid-feedback">success</div>
          </div>
          <div class="col-sm-3">
            <span>{{ simpleForm.multiLineText }}</span>
          </div>
        </div>
        <!-- number -->
        <div class="form-group row">
          <label class="col-sm-2 col-form-label" for="numberText">Number Text</label>
          <div class="col-sm-7 mb-3">
            <input type="number" class="form-control numberText" v-model.trim="simpleForm.numberText">
            <div class="invalid-feedback">error</div>
            <div class="valid-feedback">success</div>
          </div>
          <div class="col-sm-3">
            <span>{{ simpleForm.numberText }}</span>
          </div>
        </div>
        <!-- email -->
        <div class="form-group row">
          <label class="col-sm-2 col-form-label" for="email">Email</label>
          <div class="col-sm-7 mb-3">
            <input type="email" class="form-control email" placeholder="you@example.com" v-model.trim="simpleForm.email">
            <small class="form-text text-muted">We'll never share your email with anyone else.</small>
            <div class="invalid-feedback">error</div>
            <div class="valid-feedback">success</div>
          </div>
          <div class="col-sm-3">
            <span>{{ simpleForm.email }}</span>
          </div>
        </div>
        <!-- password -->
        <div class="form-group row">
          <label class="col-sm-2 col-form-label" for="password">Password</label>
          <div class="col-sm-7 mb-3">
            <input type="password" class="form-control password" v-model.trim="simpleForm.password">
            <div class="invalid-feedback">error</div>
            <div class="valid-feedback">success</div>
          </div>
          <div class="col-sm-3">
            <span>{{ simpleForm.password }}</span>
          </div>
        </div>
        <!-- select single -->
        <div class="form-group row">
          <label class="col-sm-2 col-form-label" for="singleSelect">Single Select</label>
          <div class="col-sm-7 mb-3">
            <select class="form-control singleSelect d-block w-100" v-model.trim="simpleForm.singleSelect">
              <option value="">---</option>
              <option value="1st">First select</option>
              <option value="2nd" disabled>Second disabled select</option>
              <option value="3rd">Third select</option>
              <option value="4th">Fourth select</option>
              <option value="5th">Fifth select</option>
            </select>
            <div class="invalid-feedback">error</div>
            <div class="valid-feedback">success</div>
          </div>
          <div class="col-sm-3">
            <span class="badge badge-primary">{{ simpleForm.singleSelect }}</span>
          </div>
        </div>
        <!-- select multi -->
        <div class="form-group row">
          <label class="col-sm-2 col-form-label" for="multiSelects">Multi Select</label>
          <div class="col-sm-7 mb-3">
            <select class="form-control multi-selects" v-model="simpleForm.multiSelects" multiple="multiple" size="4">
              <option value="" disabled>---</option>
              <option value="1st">First select</option>
              <option value="2nd" disabled>Second disabled select</option>
              <option value="3rd">Third select</option>
              <option value="4th">Fourth select</option>
              <option value="5th">Fifth select</option>
            </select>
            <div class="invalid-feedback">error</div>
            <div class="valid-feedback">success</div>
          </div>
          <div class="col-sm-3">
            <span v-for="(c,i) in simpleForm.multiSelects" :key="i" class="badge badge-primary" style="margin-left:2px;">{{ c }}</span>
          </div>
        </div>
        <!-- checkbox single -->
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Single Checkbox</label>
          <div class="col-sm-7 mb-3">
            <div class="form-check form-check-inline">
              <input type="checkbox" class="form-check-input singleCheck" id="singleCheck" v-model="simpleForm.singleCheck">
              <label class="form-check-label" for="singleCheck">{{ simpleForm.singleCheck }}</label>
            </div>
            <div class="invalid-feedback">error</div>
            <div class="valid-feedback">success</div>
          </div>
          <div class="col-sm-3">
            <span class="badge badge-primary">{{ simpleForm.singleCheck }}</span>
          </div>
        </div>
        <!-- checkbox single -->
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Value Single Checkbox</label>
          <div class="col-sm-7 mb-3">
            <div class="form-check form-check-inline">
              <input type="checkbox" class="form-check-input valueSingleCheck" id="valueSingleCheck" v-model="simpleForm.valueSingleCheck" true-value="active" false-value="non-active">
              <label class="form-check-label" for="valueSingleCheck">{{ simpleForm.valueSingleCheck }}</label>
            </div>
            <div class="invalid-feedback">error</div>
            <div class="valid-feedback">success</div>
          </div>
          <div class="col-sm-3">
            <span class="badge badge-primary">{{ simpleForm.valueSingleCheck }}</span>
          </div>
        </div>
        <!-- checkbox multi -->
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Multi Checkbox</label>
          <div class="col-sm-7 mb-3">
            <div class="form-check form-check-inline">
              <input type="checkbox" class="form-check-input multiChecks" id="1_multiChecks" v-model="simpleForm.multiChecks" value="1st">
              <label class="form-check-label" for="1_multiChecks">First checkbox</label>
            </div>
            <div class="form-check form-check-inline">
              <input type="checkbox" class="form-check-input multiChecks" id="2_multiChecks" v-model="simpleForm.multiChecks" value="2nd" disabled>
              <label class="form-check-label" for="2_multiChecks">Second disabled checbox</label>
            </div>
            <div class="form-check form-check-inline">
              <input type="checkbox" class="form-check-input multiChecks" id="3_multiChecks" v-model="simpleForm.multiChecks" value="3rd">
              <label class="form-check-label" for="3_multiChecks">Third checkbox</label>
            </div>
            <div class="form-check form-check-inline">
              <input type="checkbox" class="form-check-input multiChecks" id="4_multiChecks" v-model="simpleForm.multiChecks" value="4th">
              <label class="form-check-label" for="4_multiChecks">Fourth checkbox</label>
            </div>
            <div class="form-check form-check-inline">
              <input type="checkbox" class="form-check-input multiChecks" id="5_multiChecks" v-model="simpleForm.multiChecks" value="5th">
              <label class="form-check-label" for="5_multiChecks">Fifth checkbox</label>
            </div>
            <div class="invalid-feedback">error</div>
            <div class="valid-feedback">success</div>
          </div>
          <div class="col-sm-3">
            <span v-for="(c,i) in simpleForm.multiChecks" :key="i" class="badge badge-primary" style="margin-left: 2px;">{{ c }}</span>
          </div>
        </div>
        <!-- radio button -->
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Radio Button</label>
          <div class="col-sm-7 mb-3">
            <div class="form-check form-check-inline">
              <input type="radio" class="form-check-input" id="1_radioButton" v-model="simpleForm.radioButton" value="1st">
              <label class="form-check-label" for="1_radioButton">First radio</label>
            </div>
            <div class="form-check form-check-inline">
              <input type="radio" class="form-check-input" id="2_radioButton" v-model="simpleForm.radioButton" value="2nd" disabled>
              <label class="form-check-label" for="2_radioButton">Second disabled radio</label>
            </div>
            <div class="form-check form-check-inline">
              <input type="radio" class="form-check-input" id="3_radioButton" v-model="simpleForm.radioButton" value="3rd">
              <label class="form-check-label" for="3_radioButton">Third radio</label>
            </div>
            <div class="form-check form-check-inline">
              <input type="radio" class="form-check-input" id="4_radioButton" v-model="simpleForm.radioButton" value="4th">
              <label class="form-check-label" for="4_radioButton">Fourth radio</label>
            </div>
            <div class="form-check form-check-inline">
              <input type="radio" class="form-check-input" id="5_radioButton" v-model="simpleForm.radioButton" value="5th">
              <label class="form-check-label" for="5_radioButton">Fifth radio</label>
            </div>
            <div class="invalid-feedback">error</div>
            <div class="valid-feedback">success</div>
          </div>
          <div class="col-sm-3">
            <span class="badge badge-primary">{{ simpleForm.radioButton }}</span>
          </div>
        </div>
        <!-- radio button -->
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Bind Radio Button</label>
          <div class="col-sm-7 mb-3">
            <div class="form-check form-check-inline">
              <input type="radio" class="form-check-input" id="1_bindRadio" v-model="simpleForm.bindRadio" v-bind:value="simpleForm.radioButton">
              <label class="form-check-label" for="1_bindRadio">Bind radio</label>
            </div>
            <div class="form-check form-check-inline">
              <input type="radio" class="form-check-input" id="2_bindRadio" v-model="simpleForm.bindRadio" value="other">
              <label class="form-check-label" for="2_bindRadio">Other radio</label>
            </div>
            <div class="invalid-feedback">error</div>
            <div class="valid-feedback">success</div>
          </div>
          <div class="col-sm-3">
            <span class="badge badge-primary">{{ simpleForm.bindRadio }}</span>
          </div>
        </div>
        <button class="btn btn-primary btn-lg btn-block" type="submit" v-on:click.prevent="confirm">confirm</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimpleForm',
  data () {
    return {
      simpleForm: {
        singleLineText: null,
        multiLineText: null,
        numberText: 0,
        email: null,
        password: null,
        singleSelect: '1st',
        multiSelects: ['1st', '5th'],
        singleCheck: true,
        valueSingleCheck: 'active',
        multiChecks: ['1st', '5th'],
        radioButton: '1st',
        bindRadio: ''
      },
      result: {
        singleLineText: {
          hasError: false
        },
        multiLineText: {
          hasError: false
        }
      }
    }
  },
  methods: {
    confirm () {
      console.dir(this.simpleForm)
      if (this.simpleForm.singleLineText) {
        this.$el.querySelector('input.singleLineText').classList.add('is-valid')
      } else {
        this.$el.querySelector('input.singleLineText').classList.add('is-invalid')
      }
      console.dir(this.$el.querySelector('select.multi-selects').classList.add('is-valid'))
    }
  }
}
</script>
