import React, { useState, useEffect } from "react";
import api from './services/api'
// import { v4 as uuidv4 } from 'uuid';

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
  [repositories, setRepositories] = useState([]);
  
  useEffect(()=>{
    api.get('repositories').then((response)=>{
      // console.log(response.data); 
      setRepositories(response.data); 
    });
  }, []);

  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality
    // const response = await api.post(`repositories/${id}/like`);
    const response = await api.post(`repositories/${id}/like`);
    
    const repositoryIndex = repositories.findIndex(repo=> repo.id == id);

    // if(repositoryIndex < 0 ){ 
    //   return 0;
    // }

    repositories[repositoryIndex] = response.data;

    setRepositories([...repositories]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1"/>
      <SafeAreaView style={styles.container}>
        <View style={styles.repositoryContainer} key={1}> 
          {repositories.map(repository=>{
            return (
              <View key={repository.id}>
              <Text 
                style={styles.repository}
                key={repository.id}
              >
              {repository.title}
              </Text>

              <View style={styles.techsContainer}>
              { 
                repository.techs.map((tech)=>{
                  return (
                    <Text 
                      style={styles.tech}
                      key={tech}
                      >
                      {tech}
                    </Text>
                  )
                })
              }
              </View>
              
              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                  testID={`repository-likes-${repository.id}`}
                >
                  {repository.likes} curtidas
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repository.id)}
                // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                testID={`like-button-${repository.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
              </View>
            )
          })}
          
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
