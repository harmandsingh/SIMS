package configs

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ConnectDB() *mongo.Client{
	client, err := mongo.NewClient(options.Client().ApplyURI(EnvMongo()))
	if err != nil{
		log.Fatal(err)
	}

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil{
		log.Fatal(err)
	}

	err = client.Ping(ctx, nil)
	if err != nil{
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB")
	return client
}

// MongoDB Client Instance
var DB *mongo.Client = ConnectDB()

// Function to help get database collections
func GetCollection(client *mongo.Client, collectionName string) *mongo.Collection{
	collection := client.Database("go-api").Collection(collectionName)
	return collection
}