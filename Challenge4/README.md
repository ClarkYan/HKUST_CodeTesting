# Challenge4
Analyze the dataset from [Spotify's Worldwide Daily Song Ranking](https://www.kaggle.com/edumucelli/spotifys-worldwide-daily-song-ranking).

Import Pandas library and [plotly library](https://plot.ly/python/getting-started/) to analyze data and use Jupyter Notebook to conduct data processing and data visualization

## 1.List the top 10 tracks in the global throughout year 2017 with their total stream counts.

![Question01](./img/question01.png)

## 2.List the top 10 artists (or groups) those has the most stream counts for all their tracks combined, with the stream counts of each of their tracks.

![Question02](./img/question02.png)

## 3.List the top 10 tracks in December, 2017 for each continent (North America, Europe, Asia, South America, Oceania).

![Question03](./img/question03.png)

## 4.Plot the ranking changes of the Ed Sheeran's "Shape of You" alongside with the stream count changes.

![Question04](./img/question04.png)

# Bonus:

## Through the above analysis, I list the tendency of top10 tracks' stream in global field

![Bonus01](./img/bonus01.png)

Through the above line chart, we found the top three tracks has a high stream count throughout a year. So why the tracks will be rank the top of three?

## Next we will analysis them in three different aspects.
### 1.List the artist of top ten tracks and show how many tracks in the top ten.

![Bonus02](./img/bonus02.png)

### 2.List the tendency of all of tracks' stream from top three tracks' artists.

Top01 and top03 track's artist---Luis Fonsi
![Bonus03_1](./img/bonus03_1.png)
Top02 track's artist---Ed Sheeran
![Bonus03_2](./img/bonus03_2.png)
Top04 track's artist---Mariah Carey
![Bonus03_3](./img/bonus03_3.png)

### 3.List the top3 tracks' streams in different continent.

Draw a pie to show the tracks distribution in five continents
![Bonus04](./img/bonus04.png)
Utilize different method to show the data visualisition
![Bonus04_2](./img/bonus04_2.png)

### Through the above analysis, We found those bonus tasks not enough to be content to prove their correlation relationship. So I decided to conduct a prediction model by using multiple linear regression method for thier number of tracks in top50 or 80% of total volumes.

We set up Y = Top50 Tracks count / 80% Tracks Count, X1 = Total Tracks, X2 = Total Streams of Tracks in top50 / 80%

#### Result in 80% of total volumes

![Regression_80](./img/Regression_80.png)

#### Prediction in top50

![Prediction_top50](./img/Prediction_top50.png)

#### Prediction in 80% of total volumes

![prediction_80](./img/prediction_80.png)

## Contact Me
If you've encounted any problems, please do not hesitate to send an email to [Chloe Dong (me)](https://github.com/yifeidongchloe) at yifei2959@gmail.com or opening an issue on github.

