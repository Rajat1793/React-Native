import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  FlatList, KeyboardAvoidingView, Platform,
  ActivityIndicator, Alert 
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@my_notes_data';

interface Note {
  id: string;
  text: string;
}

export default function App() {
  const [noteText, setNoteText] = useState<string>('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved !== null) {
          setNotes(JSON.parse(saved));
        }
      } catch (e) {
        console.error("Failed to load");
      } finally {
        setIsLoaded(true);
      }
    };
    loadInitialData();
  }, []);

  // Save data
  useEffect(() => {
    if (isLoaded) {
      const saveData = async () => {
        try {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
        } catch (e) {
          console.error("Failed to save");
        }
      };
      saveData();
    }
  }, [notes, isLoaded]);

  const handleAddNote = () => {
    if (noteText.trim() === '') return;
    
    if (editingId) {
      setNotes(notes.map(n => n.id === editingId ? { ...n, text: noteText } : n));
      setEditingId(null);
    } else {
      const newNote: Note = { id: Date.now().toString(), text: noteText };
      setNotes([...notes, newNote]);
    }
    setNoteText('');
  };

  // 4. Added type for the id parameter
  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const clearAllNotes = () => {
    Alert.alert("Delete All Notes?", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Delete All", 
        style: "destructive", 
        onPress: () => {
          setNotes([]);
          setEditingId(null);
          setNoteText('');
        } 
      }
    ]);
  };

  if (!isLoaded) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={styles.inner}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Quick Notes 📝</Text>
            {notes.length > 0 && (
              <TouchableOpacity onPress={clearAllNotes}>
                <Text style={styles.clearBtnText}>Clear All</Text>
              </TouchableOpacity>
            )}
          </View>

          <FlatList
            data={notes}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ flexGrow: 1 }}
            ListEmptyComponent={
              <View style={styles.center}>
                <Text style={{ color: '#aaa' }}>No notes yet. Add one below!</Text>
              </View>
            }
            renderItem={({ item }) => (
              <View style={styles.noteItem}>
                <Text style={styles.noteText}>{item.text}</Text>
                <View style={styles.actions}>
                  <TouchableOpacity 
                    onPress={() => { 
                      setNoteText(item.text); 
                      setEditingId(item.id); 
                    }}
                  >
                    <Text style={styles.editBtn}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteNote(item.id)}>
                    <Text style={styles.deleteBtn}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Write a note..."
              value={noteText}
              onChangeText={setNoteText}
            />
            <TouchableOpacity style={styles.addBtn} onPress={handleAddNote}>
              <Text style={styles.addBtnText}>{editingId ? 'Update' : 'Add'}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { flex: 1, paddingHorizontal: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 20 
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  inputContainer: { 
    flexDirection: 'row', 
    paddingVertical: 20, 
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8 },
  addBtn: { backgroundColor: '#007AFF', padding: 15, marginLeft: 10, borderRadius: 8 },
  addBtnText: { color: '#fff', fontWeight: 'bold' },
  noteItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingVertical: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee' 
  },
  noteText: { flex: 1, fontSize: 16 },
  actions: { flexDirection: 'row' },
  editBtn: { color: '#007AFF', marginRight: 15 },
  deleteBtn: { color: '#FF3B30' },
  clearBtnText: { color: '#FF3B30', fontWeight: 'bold'},
});