import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Dimensions, Image, TouchableWithoutFeedback} from 'react-native';
import { getTopRatedMoviesApi } from "../api/movies";
import { Button, Text } from "react-native-paper";
import { map } from "lodash";
import useLanguage from "../hooks/useLanguage";
import usePreferences from "../hooks/usePreferences";
import { BASE_PATH_IMG } from "../utils/constants";

const {width} = Dimensions.get("window");

export default function Home(props) {
    const {navigation}= props;
    const [movies, setMovies] = useState(null);
    const [page, setPage] = useState(1);
    const {language}= useLanguage();
    const [showBtnMore, setShowBtnMore] = useState(true);
    const {theme} = usePreferences();

    useEffect(() => {
        getTopRatedMoviesApi(page,language).then((response)=>{
            const totalPages = response.total_pages;
            if (page < totalPages) {
                if (!movies) {
                    setMovies(response.results);
                }else{
                    setMovies([...movies, ...response.results]);
                }
            }else{
                setShowBtnMore(false);
            }
        });
    }, [page]);
    

    return (
        <ScrollView>
            <View style={styles.container}>
                {map(movies, (movie, index) => (
                <Movie key={index} movie={movie} navigation={navigation}/>
            ))}
            </View>
                {showBtnMore && (
                    <Button 
                        mode="contained" 
                        contentStyle={styles.loadMoreContainer} 
                        style={styles.loadMore} 
                        labelStyle={{color: theme=== "dark" ? "#fff" :"#000"}}
                        onPress={()=> setPage(page+1)}>
                        {language=== 'en-US' ? 'See more...' : 'Cargar más...'} 
                    </Button>
                )}
        </ScrollView>
            
        
    );
}

function Movie(props) {
    const {movie, navigation}= props;
    const {title, id, poster_path}= movie;

    const goMovie= ()=> {
        navigation.navigate("movie", {id});
    }

    return(
        <TouchableWithoutFeedback onPress={goMovie}>
            <View style={styles.movie}>
                {poster_path ? (
                <Image 
                    style={styles.image}
                    source={ {uri: `${BASE_PATH_IMG}/w185${poster_path}`}}
                />
                ) : (
                <Text> {title} </Text>
            )}
            </View>
        </TouchableWithoutFeedback>
        
    );
    
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    movie:{
        width: width/2,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: "100%",
        height: "100%",
    },
    loadMoreContainer: {
        paddingTop: 10,
        paddingBottom: 15,
    },
    loadMore: {
        backgroundColor: "transparent",
    }

})
