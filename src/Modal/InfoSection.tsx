import React from 'react';
import _get from 'lodash/get';

import {
  makeStyles,
  createStyles,
  Typography,
  Grid,
  Chip,
  Button,
  Tooltip,
} from '@material-ui/core';

import EmptyState from '../EmptyState';
import CardSubheading from '../Card/CardSubheading';
import GoIcon from '../GoIcon';

const useStyles = makeStyles(theme =>
  createStyles({
    title: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },

    fieldItem: {
      display: 'block',
      width: '100%',

      ...theme.typography.body2,
    },

    chip: { margin: theme.spacing(0.5) },
    fieldValue: { whiteSpace: 'pre-line' },

    valueList: {
      margin: 0,
      paddingLeft: '1.5em',
    },

    emptyState: {
      height: '100%',
      maxWidth: 256,
      margin: '0 auto',
      textAlign: 'center',
    },
    emptyStateImg: {
      margin: '0 auto',
      marginBottom: theme.spacing(2),
      display: 'block',

      userSelect: 'none',
      userDrag: 'none',
    },

    linkList: {
      margin: theme.spacing(-1, 0),
      padding: 0,
      listStyleType: 'none',
    },
  })
);

export interface IInfoSectionProps {
  title?: React.ReactNode;
  dataFields: {
    label: string;
    key: string;
    transformer?: (value: any) => any;
    variant?: 'chip' | 'list' | 'string' | 'link';
    max?: number;
  }[];
  founderDoc: any;
  hideOnEmpty?: boolean;
}

export default function InfoSection({
  title,
  dataFields,
  founderDoc,
  hideOnEmpty = false,
}: IInfoSectionProps) {
  const classes = useStyles();

  const fields: {
    label: string;
    value: any;
    variant?: string;
    max?: number;
  }[] = dataFields
    .map(field => {
      const value = _get(founderDoc, field.key);
      // transform the field if function provided
      if (!!field.transformer) {
        const transformed = field.transformer(value);
        if (!!transformed)
          return {
            label: field.label,
            value: field.transformer(value),
            variant: field.variant,
            max: field.max,
          };
        // remove the field if transformed value is undefined or empty array or empty string
        return { label: '', value: undefined, variant: field.variant };
      }
      // remove the field if value is undefined or empty array or empty string
      if (!value || value?.length === 0)
        return { label: '', value: undefined, variant: field.variant };
      // show the field normally
      return {
        label: field.label,
        value,
        variant: field.variant,
        max: field.max,
      };
    })
    .filter(field => field.label !== '' && field.value !== undefined);

  if (fields && fields.length > 0)
    return (
      <Grid container spacing={3} direction="column" wrap="nowrap">
        {title && (
          <Grid item>
            <Typography
              variant="h6"
              component="h3"
              color="textPrimary"
              className={classes.title}
            >
              {title}
            </Typography>
          </Grid>
        )}

        {fields.map(field => {
          let renderedValue: React.ReactNode = null;

          if (field.variant === 'link') {
            const toRender = Array.isArray(field.value)
              ? field.value
              : [field.value];

            renderedValue = (
              <ul className={classes.linkList}>
                {toRender.map(v => (
                  <Grid
                    container
                    key={v}
                    component="li"
                    spacing={1}
                    alignItems="baseline"
                  >
                    <Grid item xs>
                      {v.name}
                    </Grid>
                    <Grid item>
                      {v.link && (
                        <Button
                          endIcon={<GoIcon />}
                          size="small"
                          color="default"
                          component="a"
                          href={
                            v.link.startsWith('http')
                              ? v.link
                              : `https://${v.link}`
                          }
                          target="_blank"
                          rel="noopener"
                        >
                          Open
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                ))}
              </ul>
            );
          }
          // render if array
          else if (Array.isArray(field.value)) {
            // render array variant
            switch (field.variant) {
              case 'chip':
                const toRender = field.max
                  ? field.value.slice(0, field.max)
                  : field.value;

                renderedValue = (
                  <Grid container spacing={1}>
                    {toRender.map(v => (
                      <Grid item key={v}>
                        <Chip
                          label={v.split('(')[0]}
                          variant="default"
                          size="small"
                        />
                      </Grid>
                    ))}
                    {field.max && field.value.length > field.max && (
                      <Grid item>
                        <Tooltip
                          title={[...field.value]
                            .splice(field.max, field.value.length - 1)
                            .join(', ')}
                        >
                          <Chip
                            label={`+${field.value.length - field.max} more`}
                            variant="default"
                            size="small"
                          />
                        </Tooltip>
                      </Grid>
                    )}
                  </Grid>
                );
                break;

              case 'list':
                renderedValue = (
                  <ul className={classes.valueList}>
                    {field.value.map((v, i) => (
                      <li key={i}>{v.split('(')[0]}</li>
                    ))}
                  </ul>
                );
                break;

              case 'string':
              default:
                renderedValue = field.value.join(', ');
                break;
            }
          } else {
            renderedValue = (
              <Typography variant="body2" className={classes.fieldValue}>
                {field.value}
              </Typography>
            );
          }

          return (
            <Grid item key={field.label} className={classes.fieldItem}>
              <CardSubheading>{field.label}</CardSubheading>
              {renderedValue}
            </Grid>
          );
        })}
      </Grid>
    );
  else if (!hideOnEmpty) return <EmptyState message="No data" />;

  return null;
}
