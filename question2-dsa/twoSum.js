
function twoSum(nums, target) {
    const numMap = new Map();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];

        // If complement exists in map, we found our pair
        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }

        numMap.set(nums[i], i);
    }
}


const nums1 = [2, 7, 11, 15];
const result1 = twoSum(nums1, 9);
console.log(`Test 1: nums = [${nums1}], target = 9`);
console.log(`Result: [${result1}]`);
