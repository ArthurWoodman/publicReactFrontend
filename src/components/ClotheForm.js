import {Form, redirect, useActionData, useNavigate, useNavigation} from 'react-router-dom';

import classes from './ClotheForm.module.css';
import {getAuthToken} from "../util/auth";

function ClotheForm({ method, clothe }) {
    const data = useActionData();
    const navigate = useNavigate();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';


  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
        { data && data.errors && <ul>
            {Object.values(data.errors.map(err => <li key={err}>
                {err}
            </li>))}
        </ul> }
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={ clothe ? clothe.title : '' } />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={ clothe ? clothe.image : '' } />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={ clothe ? clothe.date : '' } />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={ clothe ? clothe.description : '' } />
      </p>
        <p>
            <label htmlFor="price">Price</label>
            <input id="price" type="text" name="price"  required defaultValue={ clothe ? clothe.price : '' } />
        </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{ isSubmitting ? 'Submitting' : 'Save' }</button>
      </div>
    </Form>
  );
}

export default ClotheForm;

export async function action({request, params}) {
    const method = request.method;
    const data = await request.formData();
    const token = getAuthToken();
    const clotheData = {
        title: data.get('title'),
        image: data.get('image'),
        date: data.get('date'),
        description: data.get('description'),
        price: data.get('price')
    };

    let url = 'http://localhost:8080/clothes';

    if (method === 'PATCH') {
        url += `/${params.clotheId}`;
    }

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(clotheData)
    });

    if (response.status === 422) {
        return response;
    }

    if (!response.ok) {
        throw new Response(
            JSON.stringify({message: 'Could not save an clothe!'}),
            { status: 500 }
        );
    } else {
        return redirect('/clothes');
    }
}