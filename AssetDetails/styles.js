import { StyleSheet, Dimensions } from 'react-native';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  // Header
  backIconHeader:{
    marginLeft:10
  },
  delIcon:{
   marginLeft:20,
   marginRight:20
  },
  moreIcon:{
    marginRight:10
  },
  // Content
  viewMain:{
    flex:1,
  },
  viewImageLarge:{
    height:height*1/2-100, // 388
    backgroundColor:'white',
    alignItems:'center', 
    position:'relative',
  },
  smallImage:{
    position:'absolute',
    height:80, 
    width:100,
    top:10,left:10,
    flexDirection:'row',
    borderColor:'grey',
    borderWidth:1
  },
  imagethumb:{
    height:78,
    width:66.6667
  },
  imgT:{
    flex:2/3
  },
  viewNumber:{
    flex:1/3, 
    justifyContent:'center', 
    alignItems:'center',
    backgroundColor:'#DADADA'
  },
  Accoutic:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:22, 
    marginRight:25, 
    marginLeft:25
  },
  textname:{
    fontSize:30,
    fontWeight:'bold'
  },
  // ListAsset
  listAsset:{
    marginTop:20, 
    marginRight:25, 
    marginLeft:25,
  },
  listChung:{
    flexDirection:'row', 
    justifyContent:'space-between',
    marginBottom:1, 
    backgroundColor:'white'
  },
  textBoxGuitar:{
    padding:20, 
    backgroundColor:'white', 
    marginBottom:1,
    fontSize:20
  },
  margin2:{
    marginRight:75, 
    marginLeft:75
  },
  hai003:{
    textAlign:'right', paddingRight:100
  },

})
export default styles;