Array.prototype.insertSort = function(fn) {
	// 稳定
	var array = this;
	var fn = fn || function(a, b) {
		return b > a
			// return b-a
			// return b-a?true:false
	}
	for (var i = 1; i < array.length; i++) {
		var key = array[i];
		var j = i - 1;
		while (j >= 0 && fn(key, array[j])) {
			array[j + 1] = array[j];
			j--;
		}
		array[j + 1] = key;
	}
	return array;
}
Array.prototype.binaryInsertionSort = function(fn) {
	// 稳定
	var array = this;
	var fn = fn || function(a, b) {
		return b > a
	}
	for (var i = 1; i < array.length; i++) {
		var key = array[i],
			left = 0,
			right = i - 1;
		while (left <= right) {
			var middle = parseInt((left + right) / 2);
			if (fn(array[middle],key)) {
				right = middle - 1;
			} else {
				left = middle + 1;
			}
		}
		for (var j = i - 1; j >= left; j--) {
			array[j + 1] = array[j];
		}
		array[left] = key;
	}
	return array;
}
Array.prototype.selectionSort = function(fn) {
	// 不稳定
	var array = this;
	var temp;
	var fn = fn || function(a, b) {
		return b > a
	}
	for (var i = 0; i < array.length - 1; i++) {
		var min = array[i];
		for (var j = i + 1; j < array.length; j++) {
			if (fn(min,array[j])) {
				temp = min;
				min = array[j];
				array[j] = temp;
			}
		}
		array[i] = min;
	}
	return array;
}
Array.prototype.quickSort = function(fn) {
	var array = this;
	var fn = fn || function(a, b) {
		return b > a
	}　　
	if (array.length <= 1) {
		return array;
	}　　
	var pivotIndex = Math.floor(array.length / 2);　　
	var pivot = array.splice(pivotIndex, 1)[0];　　
	var left = [];　　
	var right = [];　　
	for (var i = 0; i < array.length; i++) {　　　　
		if (array[i] < pivot) {　　　　　
			left.push(array[i]);　　　　
		} else {　　　　　　
			right.push(array[i]);　　　　
		}　　
	}　　
	return Array.prototype.quickSort(left).concat([pivot], Array.prototype.quickSort(right));
}
Array.prototype.shellSort = function(fn) {
	//不稳定
	var array = this;
	var fn = fn || function(a, b) {
		return b > a
	}　
	var stepArr = [1750, 701, 301, 132, 57, 23, 10, 4, 1]; // reverse()在维基上看到这个最优的步长较小数组
	var i = 0;
	var stepArrLength = stepArr.length;
	var len = array.length;
	var len2 = parseInt(len / 2);
	for (; i < stepArrLength; i++) {
		if (stepArr[i] > len2) {
			continue;
		}
		stepSort(stepArr[i]);
	}
	// 排序一个步长
	function stepSort(step) {
		//console.log(step) 使用的步长统计
		var i = 0,
			j = 0,
			f, tem, key;
		var stepLen = len % step > 0 ? parseInt(len / step) + 1 : len / step;
		for (; i < step; i++) { // 依次循环列
			for (j = 1; /*j < stepLen && */ step * j + i < len; j++) { //依次循环每列的每行
				tem = f = step * j + i;
				key = array[f];
				while ((tem -= step) >= 0) { // 依次向上查找
					if (fn(array[tem],key)) {
						array[tem + step] = array[tem];
					} else {
						break;
					}
				}
				array[tem + step] = key;
			}
		}
	}
	return array;

}
Array.prototype.qSort = function(fn) {
	// 不稳定
	var arr = this;
	var fn = fn || function(a, b) {
		return b > a
	}
   return quickSort(arr,0,arr.length-1);
   function quickSort(arr,l,r){
       if(l<r){
          var mid=arr[parseInt((l+r)/2)],i=l-1,j=r+1;
          while(true){
          //大的放到右边，小的放到左边, i与j均为游标
            // while(arr[++i]<mid);
            while(fn(mid,arr[++i]));
            // while(arr[--j]>mid);
            while(fn(arr[--j],mid));
            if(i>=j)break;//判断条件
            var temp = arr[i];
            arr[i]=arr[j];
            arr[j]=temp;
          }
          quickSort(arr,l,i-1);
          quickSort(arr,j+1,r);
       }
      return arr;
   }
}
Array.prototype.bubbleSort = function(fn) {
	// 稳定
	var array = this;
	var fn = fn || function(a, b) {
		return b > a
	}
	for (var i = 0; i < array.length; i++) {
		for (var j = array.length-1; j > 0; j--) {
			// if (array[j] < array[j - 1]) {
			if (fn(array[j - 1],array[j])) {
				var temp = array[j - 1];
				array[j - 1] = array[j];
				array[j] = temp;
			}
		}
	}
	return array
}
var a1 = [2, 4, 3, 6, 5, 8, 7, 9, 0, 1];
// console.log(a1.shellSort())
// console.log(a1.bubbleSort())
