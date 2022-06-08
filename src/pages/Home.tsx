import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
    id: string;
    name: string;
    date?: Date;
}

export function Home() {
    const [newSkill, setNewSkill] = useState('');
    const [mySkills, setMySkills] = useState<SkillData[]>([]);
    const [greeting, setGreeting] = useState('');


    function handleAddNewSkill(){
        const data = {
            id: String(new Date().getTime()),
            name: newSkill,
        }
        setMySkills(oldState => [...oldState, data]);
    }

    function handleRemoveSkill(id: string){
        setMySkills(oldState => oldState.filter(
            skill => skill.id !== id
        ))

    }

    // função use effect é executada quando as dependencias são alteradas
    useEffect(() =>{
        const currentHour = new Date().getHours();

        if (currentHour < 12) {
            setGreeting('Good morning!');
        }
        else if(currentHour >= 12 && currentHour <= 18) {
            setGreeting('Good afternoon!')
        } else {
            setGreeting('Good night!')
        }
    }, [])

    return (
        <View style ={styles.container}>
            <Text style={styles.title} >Welcome, Felippe</Text>
            <Text style={styles.greeting}>
                {greeting}
            </Text>
            <TextInput 
                style={styles.input} 
                placeholder="New skill"
                placeholderTextColor="#555"
                onChangeText={setNewSkill}
            />
            <Button title="Add" onPress={handleAddNewSkill} />

            <Text style={[styles.title, {marginTop: 20}]}>
                My Skills
            </Text>

            <FlatList 
                data={mySkills}
                keyExtractor={item => item.id}
                renderItem = {({ item }) => (
                    <SkillCard 
                        skill={item.name}
                        onPress={() => handleRemoveSkill(item.id)} 
                    />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#121015',
        paddingHorizontal: 20,
        paddingVertical: 70,
    },
    title: {
        color: '#fff',
        fontSize : 24,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: '#1F1e25',
        color: '#FFF',
        fontSize: 18,
        padding: 15,
        marginTop: 30,
        borderRadius: 7,
    },
    greeting: {
        color: '#fff',
        fontSize : 18,
    }
})