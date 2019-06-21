/**
 * 时间搓转换成字符串格式日期
 * @param {NUmber} date 时间搓
 * @param {String} format 时间格式
 */
import moment from 'moment';
import {
  isObject,
  isArray
} from '@/utils';

const dateFormat = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!date) return '';
  return moment(date).format(format);
};

/**
 * 數組轉 字符串 
 * @param {value} 轉換的數組
 * @param {nameKey} 顯示的key值
 * 例子： [{id: 'xxx', name: 'name1'},{id: 'xxx2', name: 'name2'] => name1,name2
 */
const arrayToString = (value, nameKey = 'name') => {
  if (typeof value === 'string' || typeof value === 'number') return value;
  if (!isArray(value) || !value.length) return '';
  return value.map(val => {
    return isObject(val) ? val[nameKey] || '' : val;
  }).join(',');
};

export default {
  arrayToString,
  dateFormat,
};
