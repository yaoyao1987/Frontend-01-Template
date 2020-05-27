window.vm = new Vue({
  el: '#app',
  data: {
    bits: Array(65).join(0).split("").map(v => Number(v)),
    value: 0
  },
  watch: {
    value(val){
      const bytes = new Uint8Array(8);
      const memory = new Float64Array(bytes.buffer);
      memory[0] = (val);
      console.log("******");
      for(var i = 0; i < 8; i++) {
        var byte = bytes[i]
        console.log(byte);
        for(var j = 0; j < 8; j ++) {
            this.bits[(8 - i) * 8 - j - 1] = byte & 1;
            byte = byte >> 1;
        }
      }
    }
  }
})