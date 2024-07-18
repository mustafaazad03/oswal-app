import { Image, TextInput, View } from "react-native";

export default function InputField({
  placeholder,
  keyboardType = "default",
  Icon,
  onChange,
  value,
  colorScheme,
}) {
  return (
    <View
      className={`px-3 h-14 border border-primary rounded-lg flex items-center flex-row mt-3`}
    >
      <View className=" px-2">
        {/* <Icon size={18} color="black" /> */}
        <Image source={Icon} className="w-6 h-6" />
      </View>

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colorScheme === "dark" ? "gray" : "black"}
        keyboardType={keyboardType}
        className=" placeholder:pl-2 pr-8 placeholder:text-dark w-full h-full text-dark bg-transparent placeholder:flex placeholder:flex-row placeholder:items-center placeholder:justify-center dark:text-white dark:placeholder-white"
        onChange={onChange}
        value={value}
      />
    </View>
  );
}
