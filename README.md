## 🚀 AI Email Writer Assistant

AI Email Writer Assistant is a powerful tool designed to generate email replies using Google Gemini AI. It consists of three main components:

- Backend: A Spring Boot application that handles AI-powered text generation.

- Frontend: A React-based web interface for composing and generating responses.

- Browser Extension: A Chrome extension that integrates directly into Gmail.


## 🌟 Features

✅ AI-Powered Responses: Generate email replies in various tones.

✅ Seamless Gmail Integration: AI reply button appears directly in Gmail interface.

✅ Customizable Tones: Choose between ```Professional```, ```Friendly```, or ```Casual``` responses.

✅ Clipboard Support: Copy generated text with one click.

✅ Spring Boot Backend: API powered by Google Gemini AI.

✅ Vite React Frontend: Simple UI to test email reply generation.


## 📌 Project Structure

```
AI Email-Writer-Assistant/
│-- backend/   email-writer-assistant (folder name for backend)                      # Spring Boot backend (handles AI API calls)
│-- frontend/  email-writer-assistant-frontend (folder name for frontend)            # Vite React frontend (provides UI for email generation)
│-- Google Chroome Extension/  email-writer-ext (folder name for extension)          # Chrome Extension (adds AI Reply button to Gmail)
```
![image](https://github.com/user-attachments/assets/7f17654f-f0ca-4ae8-aa7b-d0fc0d43fdbd)


## 🛠 Tech Stack

- **Backend**: Spring Boot, Java, Google Gemini API

- **Frontend**: Vite, React, Vanilla JavaScript, Material UI, Axios

- **Chrome-Extension**: Manifest.json, javascript, css
  
- **Others**: Spring Web, Web-flux, Lombok, Bootstrap, REST APIs, Postman


🛠 Setup Guide

### Step 1: Clone the Repository by the following command or download the zip folder of the project
```bash
git clone https://github.com/dwivedikirtiman/AI-Email-Writer-Assistant.git
```

Locate the project folder

```
cd AI-Email-Writer-Assistant
```

### Step 2: Backend Setup (Spring Boot)

1. Open the backend **`email-writer-assistant`** folder that primarly will be situated under the root folder of the project named as **`AI-Email-Writer-Assistant`** in IntelliJ IDEA with all the required dependencies, it's better to choose ```pom.xml``` file for opeining so that the IDE will automatically install all the important dependencties and the resources required for your application in order to run properly.

2. Make sure your `application.properties` is properly configured:
```properties

spring.application.name=email-writer-assistant
server.port=8080
gemini.api.url=${GEMINI_URL}
gemini.api.key=${GEMINI_KEY}

```
**IMPORTANT NOTE** 

-  Make sure to edit the configuration setting of your IDE and adding your actual Gemini API_KEY and the Gemini URL under the environment variable place like this :

  ![image](https://github.com/user-attachments/assets/cc510533-e235-4c36-b56b-7bb79fad5035)

Here, I've used both, the url as well as the key because in  ```application.properties``` file I've used ```${GEMINI_URL}``` for URL and ```${GEMINI_KEY}``` for API_KEY in follwoing format

```
GEMINI_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=;GEMINI_KEY=YOUR_ACTUAL API_KEY
```

After adding your API_KEY click on "Apply" and then click on "OK" Button.

3. Look for all the required java file in the backend application and if there is no error then you're good to go further.
  
4. Run the `EmailWriterAssistantApplication.java` class to start the backend server.

Alternatively, you can also try to look on following way-

- After the environment variable(Key and URL) setup now open the terminal and run the follwing command one by one to run the backend application

```
mvn clean install

mvn spring-boot:run
```

6. Now, that the server is running fine and all the file is now set-up properly, you need to test your API in POSTMAN that whether it is giving the proper response by hitting the
   provided URL/URI, for that open your POSTMAN Application and create a new collection with any prefered name and then add the base URL where you're routing the application in order
   to getting the response, in this case the base route path which is set as ```http://localhost:8080/api/email/generate``` and this should be entered as a **POST** request in your POSTMAN, finally
   the page will look something like this after hitting the send button if all thing is working fine then :

  ![image](https://github.com/user-attachments/assets/dc995fd2-ca3d-4a26-be23-68ebdb0e6d13)


## Special Mention

Now, before checking the postman api through the base route path I encourage you to firstly check your API cURL whether it is giving you proper reponse or not before even starting anything
with the project development for testing your API copy the cURL form the <a href = https://aistudio.google.com/apikey>Google Gemini website</a>
Copy the cURL and then create a collection in POSTMAN and import the URL and then enter your actual secret API KEY which you've generated, in the param tab and in the body tab enter the follwoing
code in the JSON Format and after that SEND the request using the POST Method:

```
{
  "contents": [{
    "parts":[{"text": "Explain how AI works"}]
    }]
   }
```
 ![image](https://github.com/user-attachments/assets/e917bde7-aa58-4a74-950d-d6e912fc144f)

 ![image](https://github.com/user-attachments/assets/634b5bab-29d2-4614-b4ce-0d7928de5f2c)



### Step 3: Font-End Setup (Vite + React)

- So for running the Front-End setup one thing which should be installed in your system is Node.js before running this front-end part so open the front-end part of the application named
  as ```email-writer-assistant-frontend``` which will be under the root folder named as ```AI-Email-Writer-Assistant``` in VS code editor as it will be easy to install or run any 
  command or you can
  also use your system **`CMD`** to run the server before that install the dependencies as I've used **`VITE`** and **`material-ui`** tool to create the front end, this is basically a 
  build tool for front end
  that can be used for fast development of frontend.

so open the front-end part in VS code or in CMD and run the follwoing command one by one

```
npm install      //to install the required dependencies if something is missing

npm run dev     //these both commands should be executed in the front end directory then only it will start the server
```

- If you're wondering what is the steps which i've followed to created the front-end from starting then i'm going to include follwing pics for your reference as it will give you guys an
  idea as how to create a front end project using VITE tool, but again saying this is only for reference, if you've downloded the source code then you don't need to do it from starting 
  as all the required resources are there in the downloaded project directory
  

 ![image](https://github.com/user-attachments/assets/426afbf5-4f05-444c-9702-ae712434a708)

 ![image](https://github.com/user-attachments/assets/80e3bb16-f4e6-40b4-b6d7-3af5894f2797)


So, from the above pics the steps is pretty much clear but still i'm writing the steps below for reference purpose-

- Firstly open the cmd or even terminal of VS code and run the Vite project creation command as follows:

  ```
   npm create vite@latest
  ```
- after that it will give you an option to name the project which in my case i've give the name as ```email-writer-assistant-frontend``` and after that it will ask to choose the framwork
  in my case that is ```React``` here and after that it will ask to choose the programming language which is ```Javascript``` here so after that it will create the project with the said
  tech stack and will ask to run you the follwing three commands one by one :

  ```
   cd email-writer-assistant-frontend    //to enter in the newly created front end project

   npm install                           // to install all the required dependencies for this project

   npm run dev                           // to run the front end
  ```

## Important Note- The frontend will be available at ```http://localhost:5173``` 

## Front-End Screenshots 

- Initially the button will be disabled as there is no content in the text area part, i've included this to just avoid the validation part, both are kind of same as i'm checking if there is
  not content in the text area then the button should not be displayed to the user

  ![image](https://github.com/user-attachments/assets/b84b05e8-4ca2-478c-8858-7871a3ca6d50)

- After entering the content in the text area the button will be enabled and also the tone selecting option will be displayed to the user like follows:

  ![image](https://github.com/user-attachments/assets/2d527121-00ff-47f3-80d6-f683ded04740)

- We can copy to clipboard option and it will be copied, it is shown in the following notepad

  ![image](https://github.com/user-attachments/assets/53ff1b30-dbef-4a01-bc7e-8649c2347d7f)

So, yes the backend and front-ent part of the application is working fine and next optioin is to create a extension for the google chrome and mutate the "AI-Reply" Button alongside the
send button in the gmail interface so, that will bring our next part of the application 


### Step 4: Google-Chrome Extension Setup

- Navigate to ```email-writer-ext```

- Open chrome://extensions/

- Enable Developer Mode

- Click Load Unpacked and select the ```email-writer-ext``` folder

- Open Gmail, click Reply, and use the AI Reply button! 🎉


## Note

- In any case you're wondering how i've created this folder and the files in this folder on the first place to create the extension so 
  Navigate to ```email-writer-ext``` folder which is under the root folder named as ```AI-Email-Writer-Extension``` and crete mainly two file first one is ```manifest.json``` and the second one
  is ```content.js``` the third can be used which is ```content.css``` but in my this particular application i've not used the css file, as the inline css has been used, copy the code from the given source code
  and follow the above mentioned steps in order to load the extension in the google chrome and then visit gmail interface and on clicking the reply the "AI Reply" button will be displyed.

  ![image](https://github.com/user-attachments/assets/4a096085-9849-4d30-ad6f-5ef0f95bb153)

## Final Screenshots/Snapshots

- After clicking on the button it will create a response the default tone is set as "professional" in the extension manifest file so it will generate the response accordingly

  ![image](https://github.com/user-attachments/assets/9f876deb-a08c-4ae9-b1d8-7deb821aa04e)

  ![image](https://github.com/user-attachments/assets/3cfeff48-092c-4926-a63b-6ed2035fa224)

  ![image](https://github.com/user-attachments/assets/5363bac6-3efe-483b-8652-9c9869f01cf3)

  ![screencapture-mail-google-mail-u-0-2025-03-31-19_07_20](https://github.com/user-attachments/assets/662262a4-7913-4b16-8f7a-cccf502775b7)


## 🎨 How It Works

1️⃣ User clicks "AI Reply" in Gmail → Content script fetches email text. 

2️⃣ Sends email content to backend → API processes the text using Gemini AI. 

3️⃣ AI generates a response → Backend sends reply back to extension. 

4️⃣ Reply is inserted into Gmail compose box → User can edit or send immediately!

## 🛠 Troubleshooting

❌ Extension button not appearing?

- Ensure Gmail interface is open and refreshed.

- Check the Chrome DevTools console for errors.

- Kindly disable any kind of Ad-Blocker whihc is running in your chrome browser as it sometimes block the local host request

❌ API not responding?

- Ensure the backend is running on ```localhost:8080```

- Check Gemini API key validity.

❌ CORS Issues?

- Add frontend URL to backend's allowed origins.

- check the follwoing line of code in your ```EmailGeneratorController.java``` file, although it is not a good practice to allow all the origin request but as we are testing the app locally it is Okay.

```
@CrossOrigin(origins = "*")
```

## 🌟 Future Enhancements(Optional/Suggestions)

🚀 Better UI: Improve design with Material UI. 

🚀 Custom Prompts: Allow users to define AI behavior. 

🚀 Email Draft Saving: Auto-save AI-generated replies. 

🚀 Mobile Support: Make the extension responsive for mobile.

## ⚙️ Contribution
Contributions are welcome! Feel free to raise issues or submit pull requests to improve the project.

## 📜 License
This project is open-source. Feel free to use and modify it!

## 👨‍💻 Author

**[Kirtiman Dwivedi]**

GitHub: https://github.com/dwivedikirtiman

Linkedin: https://www.linkedin.com/in/kirtiman-dwivedi/

Email: [dwivedikirtiman000@gmail.com]

Let’s connect—I’d love to hear your feedback! 🚀
