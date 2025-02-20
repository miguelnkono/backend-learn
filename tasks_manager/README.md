## Project Setup

In order to run the project, setup .env and set MONGO_URI variable equal to DB connection string.

In order to avoid port collisions, in the source code port values is 5000

## Install the dependencies

Type the command `npm install`, then run the next command `npm run start`.

Make sure that the previous step is complete before doing this one.

## To avoid deprecation warnings

export const connection = async (url) => {
try {
await mongoose.connect(connexion, {
useNewUrlParser: true,
useCreateIndex: true,
useUnifiedTopology: true,
useFindAndModify: false,
});
} catch (error) {
console.log("Error while traying to connect to the database", error);
}
};
