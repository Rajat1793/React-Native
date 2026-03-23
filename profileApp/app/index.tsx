import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';

type CircularProgressProps = {
  size: number;
  strokeWidth: number;
  progress: number;
  color: string;
  textColor?: string;
};

type InProgressTask = {
  id: string;
  title: string;
  category: string;
  progress: number;
};

type TaskGroup = {
  id: string;
  title: string;
  tasks: string;
  progress: number;
  color: string;
  icon: string;
};

type TaskGroupItemProps = {
  title: string;
  tasks: string;
  progress: number;
  color: string;
  icon: string;
};

// Circular progress component (Used AI to understand how to create a circular progress bar in React Native using SVG)
const CircularProgress = ({ size, strokeWidth, progress, color, textColor = '#000' }: CircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={size} height={size}>
        {/* Background Track */}
        <Circle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          opacity={0.2}
        />
        {/* Progress Stroke */}
        <Circle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <View style={{ position: 'absolute' }}>
        <Text style={{ fontSize: size * 0.22, fontWeight: 'bold', color: textColor }}>
          {progress}%
        </Text>
      </View>
    </View>
  );
};

// Task Group Item component 
const TaskGroupItem = ({ title, tasks, progress, color, icon }: TaskGroupItemProps) => (
  <View style={styles.groupCard}>
    <View style={[styles.groupIcon, { backgroundColor: color + '20' }]}>
      <Text style={{ fontSize: 20 }}>{icon}</Text>
    </View>
    <View style={{ flex: 1, marginLeft: 15 }}>
      <Text style={styles.groupTitle}>{title}</Text>
      <Text style={styles.groupSub}>{tasks}</Text>
    </View>
    <CircularProgress size={45} strokeWidth={4} progress={progress} color={color} />
  </View>
);

export default function Index() {

  // InProgress task data
  const inProgressTasks: InProgressTask[] = [
    { id: '1', title: 'Design Home Dashboard', category: 'UI/UX', progress: 82 },
    { id: '2', title: 'Build Auth Flow', category: 'Development', progress: 66 },
    { id: '3', title: 'Set Up Push Service', category: 'Mobile', progress: 47 },
    { id: '4', title: 'Write Unit Tests', category: 'Testing', progress: 39 },
    { id: '5', title: 'Fix Payment Retry Bug', category: 'Bug Fix', progress: 58 },
    { id: '6', title: 'Plan Sprint Backlog', category: 'Planning', progress: 71 },
    { id: '7', title: 'Refactor Profile Module', category: 'Code Quality', progress: 44 },
    { id: '8', title: 'Integrate Analytics SDK', category: 'Tracking', progress: 63 },
    { id: '9', title: 'Optimize App Startup', category: 'Performance', progress: 52 },
    { id: '10', title: 'Create Onboarding Screens', category: 'Product', progress: 76 },
    { id: '11', title: 'Implement Search Filters', category: 'Feature', progress: 34 },
    { id: '12', title: 'Clean API Error States', category: 'Stability', progress: 57 },
    { id: '13', title: 'Prepare Release Notes', category: 'Release', progress: 69 },
    { id: '14', title: 'Add Offline Support', category: 'Reliability', progress: 41 },
    { id: '15', title: 'Review Accessibility', category: 'Accessibility', progress: 73 },
  ];

  // Task group data
  const taskGroups: TaskGroup[] = [
    { id: '1', title: 'Office Ops', tasks: '11 Tasks', progress: 72, color: '#F06292', icon: '💼' },
    { id: '2', title: 'Personal Care', tasks: '6 Tasks', progress: 48, color: '#7E57C2', icon: '👤' },
    { id: '3', title: 'Study Track', tasks: '14 Tasks', progress: 83, color: '#FF7043', icon: '📚' },
    { id: '4', title: 'Fitness Routine', tasks: '9 Tasks', progress: 61, color: '#26A69A', icon: '💪' },
    { id: '5', title: 'Shopping Runs', tasks: '5 Tasks', progress: 37, color: '#42A5F5', icon: '🛒' },
    { id: '6', title: 'Team Syncs', tasks: '8 Tasks', progress: 55, color: '#AB47BC', icon: '🗓️' },
    { id: '7', title: 'Travel Prep', tasks: '10 Tasks', progress: 29, color: '#FFA726', icon: '✈️' },
    { id: '8', title: 'Reading Club', tasks: '12 Tasks', progress: 78, color: '#66BB6A', icon: '📖' },
    { id: '9', title: 'Finance Audit', tasks: '7 Tasks', progress: 46, color: '#EC407A', icon: '💰' },
    { id: '10', title: 'Marketing Sprint', tasks: '13 Tasks', progress: 67, color: '#5C6BC0', icon: '📣' },
    { id: '11', title: 'Client Follow-ups', tasks: '15 Tasks', progress: 74, color: '#EF5350', icon: '📞' },
    { id: '12', title: 'Content Pipeline', tasks: '16 Tasks', progress: 64, color: '#29B6F6', icon: '📝' },
    { id: '13', title: 'Dev Milestones', tasks: '18 Tasks', progress: 69, color: '#8D6E63', icon: '🧩' },
    { id: '14', title: 'Server Health', tasks: '4 Tasks', progress: 58, color: '#26C6DA', icon: '🖥️' },
    { id: '15', title: 'Bug Bash', tasks: '20 Tasks', progress: 41, color: '#FFCA28', icon: '🐞' },
    { id: '16', title: 'Design Reviews', tasks: '9 Tasks', progress: 62, color: '#7CB342', icon: '🎨' },
    { id: '17', title: 'Hiring Pipeline', tasks: '6 Tasks', progress: 35, color: '#8E24AA', icon: '🧑‍💼' },
    { id: '18', title: 'Legal Checklist', tasks: '3 Tasks', progress: 25, color: '#546E7A', icon: '⚖️' },
    { id: '19', title: 'Research Notes', tasks: '11 Tasks', progress: 57, color: '#D81B60', icon: '🔎' },
    { id: '20', title: 'Community Events', tasks: '8 Tasks', progress: 44, color: '#43A047', icon: '🎉' },
    { id: '21', title: 'Data Cleanup', tasks: '10 Tasks', progress: 53, color: '#1E88E5', icon: '🧹' },
    { id: '22', title: 'Security Checks', tasks: '7 Tasks', progress: 60, color: '#3949AB', icon: '🔐' },
    { id: '23', title: 'Vendor Coordination', tasks: '5 Tasks', progress: 38, color: '#FB8C00', icon: '🤝' },
    { id: '24', title: 'Documentation', tasks: '14 Tasks', progress: 71, color: '#6D4C41', icon: '📄' },
    { id: '25', title: 'Launch Readiness', tasks: '17 Tasks', progress: 80, color: '#00ACC1', icon: '🚀' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
      {/* Header */}
      <View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
            style={{ width: 65, height: 65, borderRadius: 50}}
          />
          <View>
            <Text style={styles.greeting}>Hello!</Text>
            <Text style={styles.userName}>Rajat</Text>
          </View>
        <Image
          source={require("../assets/images/bell.png")}
          style={styles.notification}
        />
        </View>
      </View>
      
      {/* Banner */}
      <View style={styles.banner}>
        <View style={{flex:1}}>
          <Text style={styles.heroCard}>Your today's task {"\n"} almost done!</Text>
          <TouchableOpacity style={styles.viewTask}>
            <Text style={{fontWeight: "bold" }}>View Task</Text>
          </TouchableOpacity>
        </View>
        <View style = {{flex:1, justifyContent: "center", alignItems: "center"}}>
          <CircularProgress size={90} strokeWidth={10} progress={85} color="white" textColor="white" />
        </View>
      </View>

      {/* Inprogress */}
      <Text style={styles.inprogressText}>In Progress  <Text style={styles.countText}>{inProgressTasks.length}</Text></Text>
      <FlatList
        horizontal
        data={inProgressTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.inprogressCard, {backgroundColor: item.progress > 75 ? "#ccdfee" : item.progress > 50 ? "#f0d8b5" : "#f3d4f3" }]}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskMeta}>{item.category}</Text>
            <View style={styles.taskFooter}>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${item.progress}%`, backgroundColor: item.progress > 75 ? "#7bb7e4" : item.progress > 50 ? "#e0b067" : "#ef80ef" }]} />
              </View>
              <Text style={styles.taskProgress}>{item.progress}%</Text>
            </View>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
        contentContainerStyle={styles.inprogressContent}
        style={styles.inprogressScroll}
      />

      {/* Task Groups */}
      <Text style={styles.inprogressText}>Task Group  <Text style={styles.countText}>{taskGroups.length}</Text></Text>
      <FlatList
        data={taskGroups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskGroupItem
            title={item.title}
            tasks={item.tasks}
            progress={item.progress}
            color={item.color}
            icon={item.icon}
          />
        )}
        scrollEnabled={false}
        contentContainerStyle={styles.taskGroupList}
      />

      <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  container: {
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  userName: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
  },
  greeting: {
    color: "black",
    fontSize: 18,
  },
  notification: {
    width: 30,
    height: 30,
    marginLeft: "auto",
  },
  banner: {
    flex: 1,
    flexDirection:"row",
    marginTop: 30, 
    backgroundColor:"#5E35B1", 
    borderRadius: 25, 
    padding: 16,
  },
  heroCard: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  viewTask:{ 
    marginTop: 16,
    width: 120,
    backgroundColor: "white", 
    padding: 12, 
    borderRadius: 8, 
    alignSelf: "flex-start" 
  },
  inprogressText:{
    fontSize: 20, 
    fontWeight: "bold", 
    marginTop: 30,
    color: "black"
  },
  countText: { 
    color: '#5E35B1', 
    fontSize: 16 
  },
  inprogressScroll: {
    marginTop: 16,
    borderColor: "white",
    borderWidth: 0,
    borderRadius: 8,
    minHeight: 120,
  },
  inprogressContent: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  inprogressCard:{
    width: 250, 
    height: 120, 
    backgroundColor: "white", 
    borderRadius: 20,
    marginRight: 15,
    padding: 12,
    justifyContent: 'space-between'
  },
  taskTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6a6a6a',
  },
  taskMeta: {
    fontSize: 16,
    color: '#1f1f1f',
    marginTop: 6,
    fontWeight: 'bold'
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressTrack: {
    flex: 1,
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 999,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#5E35B1',
    borderRadius: 999,
  },
  taskProgress: {
    fontSize: 14,
    color: '#5E35B1',
    fontWeight: '700',
  },
  taskGroupList: {
    marginTop: 16,
  },
  groupCard: 
  { 
    backgroundColor: 'white', 
    padding: 15, 
    borderRadius: 22, 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12, 
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 10 
  },
  groupIcon: { 
    width: 45, 
    height: 45, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  groupTitle: { 
    fontWeight: '700', 
    fontSize: 16 
  },
  groupSub: { 
    color: '#9E9E9E', 
    fontSize: 13, 
    marginTop: 2 
  }
});
