import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  googleButton: {
    backgroundColor: '#4285F4',
    width: '90%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  emailButton: {
    backgroundColor: '#f5f5f5',
    width: '90%',
    padding: 15,
    borderRadius: 5,
    
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 16,
    color: '#888',
    marginVertical: 15,
  },
  phoneInputContainer: {
   flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  PasswordInputContainer: {
    // flexDirection: 'row',
     alignItems: 'center',
     width: '90%',
     height: 20,
    //  borderWidth: 1,
    //  borderColor: '#ccc',
    //  borderRadius: 5,
     padding: 10,
     marginBottom: 400,
   },
  flag: {
    fontSize: 20,
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: '#ddd',
    width: '90%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    color: '#888',
    fontWeight: 'bold',
  },
});
export default styles;