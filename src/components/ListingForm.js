import PropTypes from 'prop-types';
import React, {useState} from 'react';
import intersection from 'lodash/intersection';
import isEqual from 'lodash/isEqual';
import startCase from 'lodash/startCase';
import union from 'lodash/union';
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Textarea
} from '@chakra-ui/react';
import {gql, useMutation, useQuery} from '@apollo/client';
import {useHistory} from 'react-router-dom';

export const AMENITIES = gql`
  query getAllAmenities {
    listingAmenities {
      id
      category
      name
    }
  }
`;

export default function ListingForm({
  mutation,
  listingId,
  listingData = {
    title: '',
    description: '',
    numOfBeds: 1,
    locationType: '',
    photoThumbnail: '',
    amenities: [],
    costPerNight: 100
  }
}) {
  const {loading, error, data} = useQuery(AMENITIES);

  if (loading) return 'Loading...';
  if (error) return `uhoh error! ${error.message}`;

  return (
    <ListingFormBody
      listingId={listingId}
      listingData={listingData}
      mutation={mutation}
      amenities={data?.listingAmenities}
    />
  );
}

ListingForm.propTypes = {
  listingData: PropTypes.object,
  listingId: PropTypes.string,
  mutation: PropTypes.object.isRequired
};

function ListingFormBody({listingData, amenities, listingId, mutation}) {
  const history = useHistory();
  const listingAmenities = listingData.amenities.map(amenity => amenity.id);
  const allAmenities = amenities.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.category]: acc[curr.category]
        ? [...acc[curr.category], curr]
        : [curr]
    };
  }, {});

  const [formValues, setFormValues] = useState({
    amenities: listingAmenities
  });

  const [submitListing, {loading}] = useMutation(mutation, {
    onCompleted: () => {
      history.push(`/listing/${listingId}`);
    }
  });

  const handleAmenitiesChange = (e, allAmenitiesInCategory) => {
    if (e.target.type === 'checkbox') {
      if (e.target.id.includes('select-all')) {
        setFormValues(prevState => {
          return {
            ...prevState,
            amenities: union(prevState.amenities, allAmenitiesInCategory) // union merges and deduplicates arrays
          };
        });
      } else {
        if (e.target.checked) {
          setFormValues({
            ...formValues,
            amenities: [...formValues.amenities, e.target.id]
          });
        } else {
          setFormValues(prevState => {
            let updatedAmenities = [...prevState.amenities];
            const indexToRemove = prevState.amenities.indexOf(e.target.id);

            if (indexToRemove > -1) {
              updatedAmenities = prevState.amenities
                .slice(0, indexToRemove)
                .concat(
                  prevState.amenities.slice(
                    indexToRemove + 1,
                    prevState.amenities.length
                  )
                );
            }

            return {...formValues, amenities: updatedAmenities};
          });
        }
      }
    }
  };
  return (
    <Stack
      as="form"
      onSubmit={e => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const uncontrolledInputs = Object.fromEntries(formData);
        uncontrolledInputs.costPerNight = Number(
          uncontrolledInputs.costPerNight
        );
        uncontrolledInputs.numOfBeds = Number(uncontrolledInputs.numOfBeds);

        submitListing({
          variables: {
            listingId,
            listing: {...uncontrolledInputs, ...formValues}
          }
        });
      }}
      spacing="8"
      mb="4"
    >
      <FormControl as="fieldset">
        <FormLabel as="legend" textTransform="uppercase">
          General Information
        </FormLabel>

        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            name="title"
            placeholder="Location name"
            defaultValue={listingData.title}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            placeholder="Describe your location"
            defaultValue={listingData.description}
          />
        </FormControl>
      </FormControl>

      <FormControl as="fieldset">
        <Stack spacing="4">
          <FormLabel as="legend" textTransform="uppercase">
            Location Details
          </FormLabel>
          <HStack spacing="8">
            <FormControl as={Stack}>
              <FormLabel>Type</FormLabel>
              <Select
                name="locationType"
                placeholder="Select option"
                defaultValue={listingData.locationType}
              >
                <option value="APARTMENT">Apartment</option>
                <option value="CAMPSITE">Campsite</option>
                <option value="HOUSE">House</option>
                <option value="ROOM">Room</option>
                <option value="SPACESHIP">Spaceship</option>
              </Select>
            </FormControl>

            <FormControl as={Stack} maxW="146px">
              <FormLabel>Bedrooms</FormLabel>
              <NumberInput
                name="numOfBeds"
                min={1}
                defaultValue={listingData.numOfBeds}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </HStack>

          <FormControl as={Stack} maxW="146px">
            <FormLabel>Cost per night</FormLabel>
            <InputGroup>
              <InputLeftAddon bg="transparent" paddingRight="0">
                $
              </InputLeftAddon>
              <NumberInput
                name="costPerNight"
                min={1}
                defaultValue={listingData.costPerNight}
              >
                <NumberInputField
                  borderLeftWidth="0"
                  borderTopLeftRadius="0"
                  borderBottomLeftRadius="0"
                />
              </NumberInput>
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel>Image</FormLabel>
            <Input
              name="photoThumbnail"
              type="text"
              placeholder="Image URL"
              defaultValue={listingData.photoThumbnail}
            />
          </FormControl>
        </Stack>
      </FormControl>

      <FormControl as="fieldset">
        <Stack spacing="4">
          <FormLabel as="legend" textTransform="uppercase">
            Amenities
          </FormLabel>

          {Object.entries(allAmenities).map(([key, val]) => (
            <AmenitiesSelection
              key={key}
              category={key}
              amenities={val}
              onChange={handleAmenitiesChange}
              formValues={formValues.amenities}
            />
          ))}
        </Stack>
      </FormControl>

      <Flex w="full" justifyContent="flex-end">
        <Button type="submit" isLoading={loading} colorScheme="blue">
          Publish listing
        </Button>
      </Flex>
    </Stack>
  );
}

ListingFormBody.propTypes = {
  listingData: PropTypes.object,
  amenities: PropTypes.array,
  mutation: PropTypes.object.isRequired,
  listingId: PropTypes.string
};

function AmenitiesSelection({formValues, category, amenities, onChange}) {
  // example value for `category` -- 'ACCOMMODATION_DETAILS'
  const title = startCase(category.toLowerCase());

  const allAmenitiesInCategory = amenities.map(amenity => amenity.id);
  const overlappingAmenities = intersection(allAmenitiesInCategory, formValues);
  return (
    <Stack>
      <HStack mb="2">
        <FormLabel mb="0">{title}</FormLabel>
        <Checkbox
          id={`${category}-select-all`}
          isChecked={isEqual(overlappingAmenities, allAmenitiesInCategory)}
          onChange={e => onChange(e, allAmenitiesInCategory)}
        >
          Select all
        </Checkbox>
      </HStack>
      <CheckboxGroup>
        <Grid templateColumns="repeat(3, 1fr)" gap="4">
          {amenities.map(({id, name}) => {
            const isChecked = formValues.includes(id);
            return (
              <Checkbox
                key={id}
                isChecked={isChecked}
                id={id}
                onChange={e => onChange(e, allAmenitiesInCategory)}
              >
                {name}
              </Checkbox>
            );
          })}
        </Grid>
      </CheckboxGroup>
    </Stack>
  );
}

AmenitiesSelection.propTypes = {
  category: PropTypes.string,
  amenities: PropTypes.array,
  formValues: PropTypes.array,
  onChange: PropTypes.func.isRequired
};
