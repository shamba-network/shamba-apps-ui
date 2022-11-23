import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";
import { IApp, IAppPayload } from "../models";

const { TextArea } = Input

interface AppFormProps {
    open: boolean;
    loading: boolean;
    editMode: boolean;
    app?: IApp;
    onCreate: (values: IAppPayload) => void;
    onEdit: (values: IAppPayload) => void;
    onCancel: () => void;
    onError: (message: string) => void;
}

export const AppForm: React.FC<AppFormProps> = ({ open, loading, editMode, app, onCreate, onEdit, onCancel, onError }) => {
    const [form] = Form.useForm()

    useEffect(
        () => {
            if (editMode) {
                form.setFieldsValue({
                    name: app?.name,
                    description: app?.description,
                    mode: app?.mode
                })
            } else {
                form.setFieldsValue({
                    mode: 'production'
                })
            }
        },
        [app, form, editMode]
    )

    const handleSubmit = async () => {
        try {
            const validated = await form.validateFields()
            editMode ? onEdit(validated) : onCreate(validated)
        } catch (err) {
            onError("Failed data validation, please try again!")
            console.error("Failed Validation: ", err)
        }
    }

    const handleCancel = () => {
        form.resetFields()
        onCancel()
    }

    return (
        <Modal
            forceRender
            open={open}
            title={editMode ? "Update App" : "Create App"}
            onCancel={handleCancel}
            onOk={handleSubmit}
            footer={[
                <Button danger key="back" type="primary" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
                    Submit
                </Button>
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                name="createApp"
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please input the name of application!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="description" label="Description">
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item name="mode" label="Mode">
                    <Select>
                        <Select.Option value="test">Test</Select.Option>
                        <Select.Option value="production">Production</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

