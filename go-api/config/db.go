package config

import (
	"context"
	"errors"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const dbName = "go-api"

var db *mongo.Database

func GetDBCollection(collection string) *mongo.Collection {
	return db.Collection(collection)
}

func InitDB() error{
	uri := os.Getenv("MONGODB_URI")
	if uri == "" {
		return errors.New("please set your 'MONGODB_URI' environment variable in order to connect to the database")
	}

	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(uri))
	if err != nil {
		return err
	}

	db = client.Database(dbName)

	return nil
}

func CloseDB() error {
	return db.Client().Disconnect(context.Background())
}