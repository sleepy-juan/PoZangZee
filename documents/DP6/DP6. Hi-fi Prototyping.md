# DP6. Hi-fi Prototyping

### POV

1. When similar emails have to be sent to many different people with little amendments, heavy email users tend to make a format on an external text editors.
2. Replies may be just simply a ‘Thank you’, or an important and urgent inquiry. The former requires no reply, while the latter requires immediate attention.
3. For heavy email users, email is an integral part of their job. They need to organize the email as tasks faster.

------

### Target Users 

- Email users with **frequent and diverse** uses

> We realized that the term "heavy user" can be misleading. It is not someone who just sends out a large amount of emails, but someone who interacts with many emails, many different people at the same time.

------

### Tasks

> Through the iteration process, we re-considered our POV and target users. This resulted in a change of our core functions as well as the tasks. Calendar function was removed because we all agreed that calendar does not resolve the second POV (categorizing emails by its status), and keyboard shortcut can be more critical for those who use emails as their primary working resource.

1. There are multiple unread emails in your Inbox. Let's say that you, at the moment, do not have enough time to read all the Emails. **Label the emails** as pinned & pin-it just by reading the subject, for keeping track of certain emails later on. Carefully look at how they are sorted.
2. Let's say that you need to inform many students their summer courses. **Send emails** with similar contexts to multiple people.

3. Assume that you need to go through the system with a limited amount of time. With the provided shortcut keys in the tutorial, please get used to the keyboard input system and **explore the email system**.

------

### Implementation Notes

- Prototype URL: [pozangzee.com](<http://pozangzee.com/>)

- Git Repository URL: <https://github.com/sleepy-juan/PoZangZee>

- Libraries and frameworks: ReactJS, Material UI, jQuery, Firebase

  #### Representative screenshots:

  > We sent sample emails to **jeongeon** (all lowercase) for user testing, so we recommend logging into **jeongeon**'s account from the log-in page. 

- This is the main page of [pozangzee.com](http://pozangzee.com). The highlight in the first email shows which email the computer is currently focused on.

  <img src="https://github.com/sleepy-juan/PoZangZee/blob/master/documents/DP6/MainPage.png?raw=true"/>



- Task 1: Label the emails as pinned & pin it - **Sort emails by pinned & pin it**

  <img src="https://github.com/sleepy-juan/PoZangZee/blob/master/documents/DP6/Sorted%20Inbox.png?raw=true"/>

  > Apart from the bold character which shows if the mail is read or not, there is the lightly highlighted emails to show that they are still pinned for later use.



- Task 2: Send emails with similar contexts to multiple people - **Format Saving Function**

  <img src="https://github.com/sleepy-juan/PoZangZee/blob/master/documents/DP6/Save%20Format.png?raw=true"/>

  > After an email is sent, you can save the whole content. By highlighting some parts, you can change the specifically highlighted parts when sending new emails.

  

  <img src="https://github.com/sleepy-juan/PoZangZee/blob/master/documents/DP6/Get%20Format.png?raw=true"/>

  > After pressing the "get format" button, the most recent format list is rendered. You can see how the saved formats are being called from the database.



- Task 3: Explore the email system with keyboard inputs - **Keyboard Shortcuts**

  <img src="https://github.com/sleepy-juan/PoZangZee/blob/master/documents/DP6/Keyboard%20Input.png?raw=true"/>

  > Since the system is designed for frequent and diverse email users, we thought getting rid of some mouse / touchpad inputs will help in reducing the overall time. 

------

### Individual Reflections

#### Jeongeon Park

- Which part of the UI did you directly contribute to?
  - I mainly worked on the UI for writing new email, as well as the get format button which connects with the Firebase and the pop-up dialog that directs to the format saving function.
- What were some of the difficulties you faced?
  - Although I had some experience with ReactJS, it was difficult to start from the very bottom to implement something that our team already had in mind. As ReactJS is a relatively new JS library, there were less information on-line, resulting in more time to solve bugs and errors.
  - Apart from the coding part, deciding the color / UI arrangements for the overall system was also difficult. We spent hours trying to choose living coral as our primary color *(Pantone's 2019 color of the year)* and the logo for our email system.
- List one useful implementation skill you learned while working on DP5 and DP6.
  - I became more familiar with the state and props concept in ReactJS, as well as using the Material UI tool kit in many different ways to make the UI look like the one I had in mind.

#### Changhyeon Park

- Which part of the UI did you directly contribute to?
 - I worked on format saving dialog. I implemented text highlighting algorithm on it.
- What were some of the difficulties you faced?
   - We worked on it as a team, and each part of our implementation is distributed on each member. Working with Git was unfamiliar to me at the first time. Integrating with other member’s code fragment was really difficult. 
- List one useful implementation skill you learned while working on DP5 and DP6.
  - I got familiar with designing UI by using Material UI.

#### Juan Lee

- Which part of the UI did you directly contribute to?
  - My main role in UI implementation was to overall merge the components and put them on the email interface layout. Also, I directly contribute to the first core function, sorted mail list with different level of importance.
- What were some of the difficulties you faced?
  - The development itself was not very difficult for me, however, the result which does not satisfy our design goal so needed to be re-implemented was a difficulty. Since the paper prototyping, we have designed the prototype four times and each of them has different tasks and slightly different design goals.

  - Also, we developed a new email interface, which is already very familiar to most users. I realized that user feedback is more detailed but sharp when we try to improve the existing interface. Thus, the reflection process was very difficult.
- List one useful implementation skill you learned while working on DP5 and DP6.
  - We decided to use Google Material Theme for our high-fidelity prototype. In order to implement the theme, I tried Material-UI for UI kits on ReactJS. It supports material design theme very well and follows the standard thoroughly,  so I think it will be very helpful for my future development.

#### Hyunchang Oh

- Which part of the UI did you directly contribute to?
  - I built the UI for reading the mail, and implemented shortkeys for all the functions. 
- What were some of the difficulties you faced?
  - It was difficult, but meaningful, to look at the code made by others and interpret how they are organised. Such a difficulty was best seen when there were multiple components rendered on the page, but they required different set of short keys. 
- List one useful implementation skill you learned while working on DP5 and DP6.
  - Throughout DP5/6, I got familiar with React, a tool that I never used in depth before taking this course.

------

## Feedbacks from Studio

#### Overall feedback summary

- The feedback can be categorized into two parts: **suggesting for more functions** and **asking for more descriptions about the functions**. Among the function suggestions, we realized that we missed out on some core functions, and we are willing to implement them as soon as possible! We also are planning to be more generous in telling the users our new functions :)



#### People liked..

- I like the logo!

- The style is really nice! 

- The use of just few colors, which contributes to ui simplicity

- I like the simple and easy use interface. I also like it’s programmer user-friendly with lots of hot keys --mouse free, Yeah~~. :) 

- Use of esc keys

- Use of keys which matches your target users (heavy mail users will be much faster using short keys)

  > The overall "I liked" part focused on two main things - the UI and the shortcut key function. We are happy to see people enjoying our service!



#### People wished..

- I wish I don’t get locked out everytime when I press back button. (after go to Inbox, sent and formats, then press “back” button)

  > Seems like a good suggestion for safety. We will try to implement that part so that the log-out don't happen with just a click.

- I wish it has log-out button.

  > Also something we did not even think about - yes we will include that :)

- I wish there is a notification for user. The page does not show which account I’m using. +) tutorials for short keys!!

- I wish you provide guide of all the hot keys to users so they don’t have to figure them out themselves [+1]

  > Thank you for pointing out things that we missed! We have no idea how we forgot about the **account user information**, and we will make sure to implement that as well as providing **guidelines for the key inputs**.

- I wish you notice the number of mail.

  > Sure. We will make that happen :)

- In some case, ctrl+return is mapped for new line, so i think it should be mapped with other key. (External consistency)

  > However, we think that in most cases, **return itself** is more likely to be mapped with new line. Even in other email platforms, **ctrl+return** is used for sending emails! But then again for safety, we will make the shortcut key frequently notified to the users.



#### People pointed out (what if +)..

- It is good for showing help page of shortcut keys.

  > Yes! As many people pointed out the necessity of having shortcut key guidelines, we will make sure that the tutorial / guideline will be put somewhere the users can never miss.

- What if there’s classification of email to only see KEEP or IGNORE? And what happens to ignore. Does it delete the email or hide?

  > Although not clearly stated, all the IGNORE emails go to the bottom of the Inbox, and we believe that after sorting, the borderline between the KEEP and the IGNORE emails will be more clear. Pressing the IGNORE key does not delete / hide the email. It simply disappears from the view of the users (which is usually the top) so that the users can **focus on** the more essential emails.