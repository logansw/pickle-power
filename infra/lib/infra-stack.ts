import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from "aws-cdk-lib/aws-lambda";

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFunction = new lambda.Function(this, "LambdaFunction", {
        runtime: lambda.Runtime.PYTHON_3_13,
        code: lambda.Code.fromAsset("lambda"),
        handler: "main.handler",
    });

    const functionUrl = lambdaFunction.addFunctionUrl({
        authType: lambda.FunctionUrlAuthType.NONE,
        cors: {
            allowedOrigins: ["*"],
            allowedMethods: [lambda.HttpMethod.ALL],
            allowedHeaders: ["*"],
        },
    });

    new cdk.CfnOutput(this, "Url", {
        value: functionUrl.url,
    });
  }
}
