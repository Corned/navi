# Navi

[navi](https://navi.tmp.ooo/)

Navi is a website where users can create a profile to easily share links to their most used social media platforms. The goal of this project is for me to learn Firebase.

## Technologies

Built using React.js and Firebase.









## Firestore unique url for this project

- Profile document's ID will the `url` used to access user's profile and links.
- Changing document's ID is not possible, so when user wants to change their url, we need to delete the existing data and then upload it again with the new ID (which is the wanted url).

https://firebase.google.com/docs/firestore/manage-data/transactions#batched-writes