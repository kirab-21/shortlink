import React, { useState, useEffect } from "react";
import { nanoid } from 'nanoid'
import { getDatabase, child, ref, set, get } from "firebase/database";
import { isWebUri } from 'valid-url';

const Form = () => {
    const [longURL, setLongURL] = useState('');
    const [preferedAlias, setPreferedAlias] = useState('');
    const [generatedURL, setGeneratedURL] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [errorMessage, setErrorMessage] = useState({});
    const [toolTipMessage, setToolTipMessage] = useState('Copy To Clip Board');

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setGeneratedURL('');

        const isFormValid = await validateInput();
        if (!isFormValid) {
            return;
        }

        const generatedKey = nanoid(5);
        const url = "shortlink.com/" + (preferedAlias !== '' ? preferedAlias : generatedKey);

        const db = getDatabase();
        set(ref(db, '/' + generatedKey), {
            generatedKey,
            longURL,
            preferedAlias,
        }).then(() => {
            setGeneratedURL(url);
            setLoading(false);
        }).catch((e) => {
            console.error(e); // handle errors appropriately
        });
    };

    const hasError = (key) => errors.includes(key);

    const handleChange = (e) => {
        const { id, value } = e.target;
        switch (id) {
        case 'longURL':
            setLongURL(value);
            break;
        case 'preferedAlias':
            setPreferedAlias(value);
            break;
        default:
            break;
        }
    };

    const validateInput = async () => {
        const newErrors = [];
        const newErrorMessages = {};

        if (!longURL) {
            newErrors.push('longURL');
            newErrorMessages['longURL'] = 'Please enter your URL!';
        } else if (!isWebUri(longURL)) {
            newErrors.push('longURL');
            newErrorMessages['longURL'] = 'Enter a URL in the form http(s)://';
        }

        if(preferedAlias) {
            if(preferedAlias.length > 7) {
                newErrors.push('suggestedAlias');
                newErrorMessages['suggestedAlias'] = 'Please Enter an Alias (<= 7 characters)';
            } else if (preferedAlias.indexOf(' ') >= 0) {
                newErrors.push('suggestedAlias');
                newErrorMessages['suggestedAlias'] = 'Spaces are not allowed';
            }

        const keyExists = await checkKeyExist();
        if(keyExists.exists()) {
            newErrors.push('suggestedAlias');
            newErrorMessages['suggestedAlias'] = 'Alias Entered already exists!';
        }
    }

    setErrors(newErrors);
    setErrorMessage(newErrorMessages);
    setLoading(false);

    return newErrors.length === 0;
    };

    const checkKeyExists = async () => {
        const dbRef = ref(getDatabase());
        try {
            const snapshot = await get(child(dbRef, `/${preferedAlias}`));
            return snapshot.exists();
        } catch (error) {
            console.error(error); // handle errors appropriately
            return false;
        }
    };

    const copyToClipBoard = () => {
        navigator.clipboard.writeText(generatedURL);
        setToolTipMessage('Copied.');
    };

  return (
    <div className="container-md">
      <form autoComplete="off">
        <h2>Short URL!</h2>

        <div>
            
        </div>
      </form>
    </div>
  );
};

export default Form;