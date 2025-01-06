import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { articleTypes } from '..';

type ArticleCardProps = { article: articleTypes.Article };

export const ArticleCard = (props: ArticleCardProps) => {
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + '...'
      : text;
  };
  return (
    <Card
      className="max-w-[320px] shadow-none border border-alto"
      sx={{ maxWidth: 365 }}
    >
      <a
        href={`https://makalabox.com/article/${props.article.id}/`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <CardActionArea>
          <CardMedia
            component="img"
            className="max-h-[220px]"
            image={props.article.photo}
            alt="green iguana"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="text-[18px] font-semibold"
            >
              {props.article.title}
            </Typography>
            <a
              href={`https://makalabox.com/article/${props.article.id}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 border flex rounded justify-center items-center border-alto p-1 transition duration-300 hover:bg-blue hover:text-white"
            >
              Читать дальше
            </a>
          </CardContent>
        </CardActionArea>
      </a>
    </Card>
  );
};
