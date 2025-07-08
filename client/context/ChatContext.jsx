import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContextProvider';
import { ChatContext } from './CreateChatContext';
import toast from 'react-hot-toast'

export const ChatProvider = ({children})=>{
  
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});

  const { socket, axios } = useContext(AuthContext);

  // function to get all users for sidebar
  const getUsers = async ()=> {
    try {
      const { data } = await axios.get("/api/messages/users");
      if(data.success){
        setUsers(data.users)
        setUnseenMessages(data.unSeenMessages)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  
  // function to get messages for selected users
  const getMessages = async (userId)=>{
    try {
      const { data } = await axios.get(`/api/messages/${userId}`)
      if(data.success){
        setMessages(data.messages);
        // Reset unseen messages for this user since we're viewing their chat
        setUnseenMessages(prev => ({
          ...prev,
          [userId]: 0
        }));
        // Sidebar'ı güncelle
        getUsers();
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // function to send message to selected user
  const sendMessage = async (messageData)=> {
    try {
      const { data } = await axios.post(`/api/messages/send/${selectedUser._id}`, messageData)
      if(data.success){
        // Mesajı state'e eklemeyi kaldırıyoruz çünkü socket'ten gelecek
        // setMessages((prevMessages)=>[...prevMessages, data.newMessage])
        // Refresh users to update unseen message counts in sidebar
        getUsers();
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);      
    }
  }

  // function to subscribe to messages for selected user
  const subscribeToMessages = async ()=> {
    if(!socket) return;
    socket.on("newMessage", (newMessage)=> {
      // Eğer seçili kullanıcı ile ilgili bir mesaj ise (gelen veya giden)
      if(selectedUser && (newMessage.senderId === selectedUser._id || newMessage.receiverId === selectedUser._id)){
        // Eğer gelen mesaj ise seen olarak işaretle
        if(newMessage.senderId === selectedUser._id){
          newMessage.seen = true; 
          axios.put(`/api/messages/mark/${newMessage._id}`);
        }
        setMessages((prevMessages)=> [...prevMessages, newMessage]);
        // Sidebar'ı güncelle
        getUsers();
      } else {
        // Başka kullanıcıdan gelen mesaj ise unseen count'u artır
        setUnseenMessages((prevUnseenMessages)=>({
          ...prevUnseenMessages, 
          [newMessage.senderId] : prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages[newMessage.senderId] + 1 : 1
        }))
        // Sidebar'ı güncelle
        getUsers();
      }
    })
  }

  // function to unsubscribe from messages
  const unsubscribeFromMessages = async ()=> {
    if(socket) socket.off("newMessage");

  }

  useEffect(()=>{
    subscribeToMessages();
    return ()=> unsubscribeFromMessages();
  }, [socket, selectedUser])


  const value = {
    messages,
    users,
    selectedUser,
    getUsers,
    getMessages,
    sendMessage,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  }
  
  return (<ChatContext.Provider value={value}>
    {children}
  </ChatContext.Provider>)
}

export default ChatProvider;