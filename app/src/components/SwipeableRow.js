import React, { useRef } from "react";
import { View, Animated, StyleSheet, I18nManager } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { FontAwesome } from "@expo/vector-icons";

const SwipeableRow = ({
	children,
	leftButtonColor,
	leftButtonIcon,
	leftButtonAction,
	rightButtonColor,
	rightButtonIcon,
	rightButtonAction
}) => {
	const swipeRef = useRef();

	const onLeftAction = () => {
		leftButtonAction();
		swipeRef?.current?.close();
	};

	const onRightAction = () => {
		rightButtonAction();
	};

	const renderLeftActions = (
		_progress: Animated.AnimatedInterpolation,
		dragX: Animated.AnimatedInterpolation
	) => {
		const trans = dragX.interpolate({
			inputRange: [0, 50, 100, 101],
			outputRange: [-20, 0, 0, 1],
			extrapolate: "clamp",
		});
		return (
			<RectButton
				style={[styles.leftAction, { backgroundColor: leftButtonColor }]}
				onPress={onLeftAction}
			>
				<Animated.Text style={[styles.actionText, { transform: [{ translateX: trans }] }]}>
					<FontAwesome style={styles.actionText} name={leftButtonIcon} size={40}/>
				</Animated.Text>
			</RectButton>
		);
	};

	const renderRightAction = (x, progress: Animated.AnimatedInterpolation) => {
		const trans = progress.interpolate({
			inputRange: [0, 1],
			outputRange: [x, 1],
		});

		return (
			<Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
				<RectButton
					style={[styles.rightAction, { backgroundColor: rightButtonColor }]}
					onPress={onRightAction}
				>
					<FontAwesome style={styles.actionText} name={rightButtonIcon} size={40}/>
				</RectButton>
			</Animated.View>
		);
	};

	const renderRightActions = (
		progress: Animated.AnimatedInterpolation,
		_dragAnimatedValue: Animated.AnimatedInterpolation
	) => (
		<View
			style={{
				flex: 1,
				flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
			}}>
			{renderRightAction(100, progress)}
		</View>
	);

	return (
		<Swipeable
			ref={swipeRef}
			friction={2}
			leftThreshold={80}
			enableTrackpadTwoFingerGesture
			rightThreshold={40}
			renderLeftActions={renderLeftActions}
			renderRightActions={renderRightActions}
		>
			{children}
		</Swipeable>
	);
};

const styles = StyleSheet.create({
	leftAction: {
		flex: 1,
		justifyContent: "center"
	},
	actionText: {
		color: "white",
		backgroundColor: "transparent",
		padding: 10
	},
	rightAction: {
		alignItems: "flex-end",
		flex: 1,
		justifyContent: "center"
	},
	rectButton: {
		flex: 1,
		height: 100,
		paddingVertical: 10,
		paddingHorizontal: 20,
		justifyContent: "space-between",
		flexDirection: "column",
		backgroundColor: "white"
	}
});

export default SwipeableRow;