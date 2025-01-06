import { Paper, Typography } from "@mui/material"
import { articleQueries } from "~entities/makalabox"
import { ArticleCard } from "~entities/makalabox/ui/ArticleCard"


export const MakalaList = () => {

    const {
      data: articles, isSuccess
    } = articleQueries.useGetArticles()

    
  const latestArticles = articles?.data.results.slice(0, 3);

  return (
    <Paper
    elevation={3}
    className=" p-5 shadow-none border border-alto rounded-md flex flex-col items-center gap-5"
  >
    <Typography variant="h6" className="font-bold ">
      Статьи на Makalabox
    </Typography>
    {isSuccess && latestArticles.map((article) => (
      <ArticleCard article={article} key={article.id} />
    ))}
  </Paper>
  )
}
