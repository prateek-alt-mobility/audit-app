import { View, Text, TouchableOpacity } from "react-native";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { increment, decrement } from "../store/slices/counterSlice";
import { AntDesign } from "@expo/vector-icons";

export default function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <View className="flex-row items-center justify-center space-x-4 p-4 bg-gray-50 rounded-xl">
      <TouchableOpacity
        className="bg-black w-12 h-12 rounded-full items-center justify-center"
        onPress={() => dispatch(decrement())}
      >
        <AntDesign name="minus" size={24} color="white" />
      </TouchableOpacity>

      <View className="w-20">
        <Text className="text-2xl text-center font-bold">{count}</Text>
      </View>

      <TouchableOpacity
        className="bg-black w-12 h-12 rounded-full items-center justify-center"
        onPress={() => dispatch(increment())}
      >
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
