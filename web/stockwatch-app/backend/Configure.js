import Amplify, { API, Hub, Auth, Storage } from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

export default Amplify;
export { API, Hub, Auth, Storage };
