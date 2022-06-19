import React from "react";
import { Calendar, Agenda } from "react-native-calendars";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

const RecipePlannerScreen = () => {
	const { colors } = useTheme()
	const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
	const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
	const workout = { key: 'workout', color: 'green' };

	return (
		<View>
			<Calendar
				theme={{
					arrowColor: colors.primary,
					todayTextColor: colors.primary
				}}
				markingType={'multi-dot'}
				markedDates={{
					'2022-04-20': { dots: [vacation, massage, workout], selected: true },
					'2017-10-24': { dots: [massage, workout], disabled: true }
				}}
			/>
			<Agenda/>
		</View>
	);
};

export default RecipePlannerScreen;