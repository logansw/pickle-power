import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { CfnPlaybackRestrictionPolicy } from 'aws-cdk-lib/aws-ivs';

export class InfraStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        
        const lambdaFunction = new lambda.Function(this, 'LambdaFunction', {
                runtime: lambda.Runtime.PYTHON_3_13,
                code: lambda.Code.fromAsset('lambda'),
                handler: 'handler.handler'
        });

        const api = new apigateway.LambdaRestApi(this, 'myapi', {
                handler: lambdaFunction,
                proxy: false,
                restApiName: 'PicklePowerAPI'
        });
        
        const usersResource = api.root.addResource('users');
        usersResource.addMethod('POST');
        const userResource = usersResource.addResource('{userId}');
        userResource.addMethod('GET');
        userResource.addMethod('PUT');

        const loginResource = api.root.addResource('login');
        loginResource.addMethod('POST');
        const logoutResource = api.root.addResource('logout');
        logoutResource.addMethod('POST');
    }
}