import { Card, CardContent, Stack, Typography } from "@mui/material";

type CardPropsType = {
  title: string;
  icon: JSX.Element;
  value: string;
  subtitle: string;
  color: string;
  shadowColor: string;
};

const DataCard = ({
  title,
  icon,
  value,
  subtitle,
  color,
  shadowColor,
}: CardPropsType) => {
  return (
    <>
      <Card
        component={Stack}
        spacing={3}
        direction="row"
        sx={{
          p: 3,
          py: 1,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Stack spacing={2}>
            <Typography
              variant="h6"
              fontSize={[14, 18]}
              color={"text.secondary"}
              fontFamily={"inter"}
            >
              {title}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={3}>
              <Stack
                alignItems={"center"}
                bgcolor={color}
                p={[1, 2]}
                borderRadius={3}
                boxShadow={`0px 0px 10px ${shadowColor}`}
              >
                {icon}
              </Stack>
              <Typography
                variant="h4"
                fontSize={[30, 36]}
                fontWeight={"bolder"}
                fontFamily={"inter"}
              >
                {value}
              </Typography>
            </Stack>
            <Typography variant="subtitle2" sx={{ color: "text.disabled" }}>
              {subtitle}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default DataCard;
