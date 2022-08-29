import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Button
} from "react-native";
import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false)

  const startAddGoal = () => {
    setShowAddGoalModal(true)
  }
  const endAddGoal = () => {
    setShowAddGoalModal(false)
  }

  const addGoalHandler = (enteredGoalText) => {
    setCourseGoals((currentGoals) => [...currentGoals, { id: new Date().getTime(), text: enteredGoalText }]);
    endAddGoal();
  };

  const deleteGoalItemHandler = (id) => {
    setCourseGoals(prevGoals => prevGoals.filter(pg => pg.id !== id))
  }

  return (<>
    <StatusBar style="light" />
    <View style={styles.appContainer}>
      <Button title="Add a New Goal" color="#a065ec" onPress={startAddGoal} />
      <GoalInput onAddGoal={addGoalHandler} showModal={showAddGoalModal} onEndAddGoal={endAddGoal} />
      <View style={styles.goalsContainer}>
        <FlatList data={courseGoals} renderItem={(itemData) => {
          return <GoalItem itemData={itemData} onDelete={deleteGoalItemHandler} />
        }
        } alwaysBounceVertical={false} keyExtractor={(item, index) => {
          return item.id
        }} />
      </View>
    </View>
  </>);
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    // flexGrow: 1,
    // flexShrink: 1,
    flexDirection: "column",
    paddingTop: 50,
    paddingHorizontal: 16
  },
  goalsContainer: {
    flex: 5,
    flexGrow: 5,
    // flexShrink: 5,
  }
});
