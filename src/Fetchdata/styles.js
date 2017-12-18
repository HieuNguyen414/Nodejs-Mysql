import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  // Class View
  viewHeader:{
    backgroundColor:'grey', 
    height:64, 
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center'
  },
  inputSearch:{
    marginLeft:10,
    width:250, 
    alignItems:'center',
    borderWidth:0.6, 
    height:45, 
    borderColor:'white', 
    borderRadius:3
  },
  touchSearch:{
    marginLeft:15
  },
  touchPlus:{
    marginRight:10
  },
  // Class FlatlistItems
  viewSwipe:{
    flex:1,
    flexDirection:'row', 
    backgroundColor:'white',
  },
  imgSwipe:{
    width:80, 
    height:80, 
    margin:5
  },
  bottomView:{
    height:1,
    backgroundColor:'black'
  },
  viewData:{
    flex:1, height:80
  }


})
  
  export default styles;