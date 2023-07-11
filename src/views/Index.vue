<template>
  <div class='flex justify-center mt-16'>
    <el-space wrap>
      <el-progress :color='percentage2color' :percentage='year' type='circle'>年</el-progress>
      <el-progress :color='percentage2color' :percentage='month' type='circle'>月</el-progress>
      <el-progress :color='percentage2color' :percentage='week' type='circle'>周</el-progress>
      <el-progress :color='percentage2color' :percentage='day' type='circle'>日</el-progress>
      <el-progress :color='percentage2color' :percentage='hour' type='circle'>时</el-progress>
      <el-progress :color='percentage2color' :percentage='minute' type='circle'>分</el-progress>
    </el-space>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { dayjs } from 'element-plus';

const year = ref(0);
const month = ref(0);
const week = ref(0);
const day = ref(0);
const hour = ref(0);
const minute = ref(0);

const percentage2color = (percentage) => {
  // 计算色相
  const hue = percentage * 36 % 360;
  // 计算饱和度和亮度
  const saturation = 100;
  const lightness = 75;
  // 将 HSL 值转换为 HEX 颜色值
  const hslToHex = (h, s, l) => {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = x => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };
  return hslToHex(hue, saturation, lightness);
};


setInterval(() => {
  year.value = dayjs().diff(dayjs().startOf('year')) / dayjs().endOf('year').diff(dayjs().startOf('year')) * 100;
  month.value = dayjs().diff(dayjs().startOf('month')) / dayjs().endOf('month').diff(dayjs().startOf('month')) * 100;
  week.value = dayjs().diff(dayjs().startOf('week')) / dayjs().endOf('week').diff(dayjs().startOf('week')) * 100;
  day.value = dayjs().diff(dayjs().startOf('day')) / dayjs().endOf('day').diff(dayjs().startOf('day')) * 100;
  hour.value = dayjs().diff(dayjs().startOf('hour')) / dayjs().endOf('hour').diff(dayjs().startOf('hour')) * 100;
  minute.value = dayjs().diff(dayjs().startOf('minute')) / dayjs().endOf('minute').diff(dayjs().startOf('minute')) * 100;
}, 100);


</script>

<style scoped>

</style>