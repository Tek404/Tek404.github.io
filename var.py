from itertools import combinations

def generate_variations(original_list):
    variations = {tuple(sorted(original_list))}  

    for i in range(len(original_list)):
        if original_list[i] == 3:
            # 3 can become 6
            variation = list(original_list)
            variation[i] = 6
            variations.add(tuple(sorted(variation)))
        elif original_list[i] == 6:
            # 6 can become 3
            variation = list(original_list)
            variation[i] = 3
            variations.add(tuple(sorted(variation)))

    # convert set to list and sort
    unique_variations = [list(sorted(variation)) for variation in variations]

    return unique_variations

def compare_lists_remove_occurrences(list1, list2):
    occurrences = list(list1)
    result_list = []
    for item in list2:
        if item in occurrences:
            occurrences.remove(item)
        else:
            result_list.append(item)
    return result_list

def find_numbers_with_sum(numbers, target_sum):
    valid_combinations = []

    for combo in combinations(numbers, 3):
        if sum(combo) == target_sum:
            remaining_numbers = compare_lists_remove_occurrences(combo, numbers)
            valid_combinations.append((combo, sum(remaining_numbers), remaining_numbers))

    return valid_combinations if valid_combinations else []

original_list = []
target_sums = [10, 20, 30, 
               40, 50, 60, 
               70, 80, 90, 
               100, 110, 120, 
               130, 140, 150, 
               160, 170, 180]

print("Enter numbers below, 1-10, J=20, Q=30, K=40, AceSpades = 11")

for _ in range(5):
    original_list.append(int(input("Enter Number > ")))

result_variations = generate_variations(original_list)
for numbers_list in result_variations:
    print("----------------------------------------")
    print(numbers_list)
    for target_sum in target_sums:
        valid_combinations = find_numbers_with_sum(numbers_list, target_sum)
        if valid_combinations:
            for result, remaining_sum, remaining_numbers in valid_combinations:
                print("---------")
                print(f"Numbers with sum {target_sum}: {result}")
                print(f"Remaining numbers: {remaining_numbers} Sum : {remaining_sum}")
